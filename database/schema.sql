-- Clever Reduction Database Schema
-- PostgreSQL compatible schema for self-hosting

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE app_role AS ENUM ('admin', 'editor', 'viewer');

-- ============================================
-- USERS & AUTHENTICATION
-- ============================================

-- Admin users table (linked to auth.users when using Supabase)
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_main_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User roles table (CRITICAL: Roles must be in separate table for security)
CREATE TABLE user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, role)
);

-- ============================================
-- SECURITY FUNCTIONS
-- ============================================

-- Security definer function to check user roles (prevents recursive RLS issues)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT has_role(_user_id, 'admin')
$$;

-- Prevent main admin deletion
CREATE OR REPLACE FUNCTION prevent_main_admin_deletion()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.is_main_admin = true THEN
    RAISE EXCEPTION 'Cannot delete the main admin account';
  END IF;
  RETURN OLD;
END;
$$;

CREATE TRIGGER prevent_main_admin_delete
  BEFORE DELETE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION prevent_main_admin_deletion();

-- ============================================
-- BLOG SYSTEM
-- ============================================

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    author_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    author_name VARCHAR(255) NOT NULL,
    status post_status DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    view_count INTEGER DEFAULT 0,
    
    -- SEO fields
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    
    -- Full text search
    search_vector tsvector
);

-- Blog comments table
CREATE TABLE blog_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    author_name VARCHAR(255) NOT NULL,
    author_email VARCHAR(255),
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog categories table
CREATE TABLE blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog post categories junction table
CREATE TABLE blog_post_categories (
    post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, category_id)
);

-- ============================================
-- ANALYTICS & TRACKING
-- ============================================

-- Page views table
CREATE TABLE page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_path VARCHAR(500) NOT NULL,
    page_title VARCHAR(500),
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    country VARCHAR(100),
    region VARCHAR(100),
    city VARCHAR(100),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    session_id UUID,
    duration_seconds INTEGER DEFAULT 0,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sessions table
CREATE TABLE visitor_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID UNIQUE NOT NULL,
    first_page VARCHAR(500),
    last_page VARCHAR(500),
    page_count INTEGER DEFAULT 1,
    total_duration_seconds INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- CONTACT & LEADS
-- ============================================

-- Contact form submissions
CREATE TABLE contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    message TEXT NOT NULL,
    form_type VARCHAR(50), -- 'contact', 'demo', 'sales'
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- COMPANY PAGES
-- ============================================

-- Company pages content management
CREATE TABLE company_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_slug VARCHAR(100) UNIQUE NOT NULL, -- 'careers', 'contact', 'press', 'partners'
    page_title VARCHAR(255) NOT NULL,
    content TEXT,
    image_url TEXT,
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- RESOURCES PAGES
-- ============================================

-- Resources pages content management
CREATE TABLE resource_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_slug VARCHAR(100) UNIQUE NOT NULL, -- 'webinars', 'guide', 'standards', 'case-studies', 'documentation'
    page_title VARCHAR(255) NOT NULL,
    content TEXT,
    image_url TEXT,
    meta_title VARCHAR(60),
    meta_description VARCHAR(160),
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- SUPPORT TICKETS
-- ============================================

-- Support tickets table
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'in_progress', 'closed'
    response TEXT,
    admin_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    closed_at TIMESTAMP WITH TIME ZONE
);

-- ============================================
-- WEBINARS
-- ============================================

-- Webinars table
CREATE TABLE webinars (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    speaker_name VARCHAR(255) NOT NULL,
    scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
    duration_minutes INTEGER NOT NULL,
    registration_url TEXT,
    max_capacity INTEGER,
    current_registrations INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'scheduled', -- 'scheduled', 'live', 'completed', 'cancelled'
    created_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PRICING & SUBSCRIPTIONS
-- ============================================

-- Pricing plans table
CREATE TABLE pricing_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_name VARCHAR(100) UNIQUE NOT NULL, -- 'demo', 'emissions_calculation', 'consultant'
    display_name VARCHAR(100) NOT NULL,
    price_monthly DECIMAL(10, 2) NOT NULL,
    price_yearly DECIMAL(10, 2),
    description TEXT,
    features JSONB, -- Array of features as JSON
    max_users INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES pricing_plans(id) ON DELETE SET NULL,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'cancelled', 'expired', 'trial'
    billing_cycle VARCHAR(20) DEFAULT 'monthly', -- 'monthly', 'yearly'
    trial_ends_at TIMESTAMP WITH TIME ZONE,
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Blog posts indexes
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_search ON blog_posts USING gin(search_vector);

-- Comments indexes
CREATE INDEX idx_blog_comments_post ON blog_comments(post_id);
CREATE INDEX idx_blog_comments_approved ON blog_comments(is_approved);

-- Analytics indexes
CREATE INDEX idx_page_views_path ON page_views(page_path);
CREATE INDEX idx_page_views_date ON page_views(viewed_at);
CREATE INDEX idx_page_views_session ON page_views(session_id);
CREATE INDEX idx_visitor_sessions_date ON visitor_sessions(started_at);

-- Company and Resources pages indexes
CREATE INDEX idx_company_pages_slug ON company_pages(page_slug);
CREATE INDEX idx_company_pages_published ON company_pages(is_published);
CREATE INDEX idx_resource_pages_slug ON resource_pages(page_slug);
CREATE INDEX idx_resource_pages_published ON resource_pages(is_published);

-- Support tickets indexes
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_email ON support_tickets(email);
CREATE INDEX idx_support_tickets_created ON support_tickets(created_at DESC);

-- Webinars indexes
CREATE INDEX idx_webinars_scheduled_date ON webinars(scheduled_date);
CREATE INDEX idx_webinars_status ON webinars(status);
CREATE INDEX idx_webinars_created_by ON webinars(created_by);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_company_pages_updated_at BEFORE UPDATE ON company_pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resource_pages_updated_at BEFORE UPDATE ON resource_pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_plans_updated_at BEFORE UPDATE ON pricing_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_support_tickets_updated_at BEFORE UPDATE ON support_tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_webinars_updated_at BEFORE UPDATE ON webinars
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Update search vector for blog posts
CREATE OR REPLACE FUNCTION blog_posts_search_trigger()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.excerpt, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.content, '')), 'C');
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER blog_posts_search_update BEFORE INSERT OR UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION blog_posts_search_trigger();

-- Generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$ language 'plpgsql';

-- ============================================
-- SAMPLE DATA (optional)
-- ============================================

-- Insert main admin (password: admin123 - CHANGE THIS IN PRODUCTION!)
-- Password hash generated using bcrypt
INSERT INTO admin_users (email, password_hash, full_name, is_main_admin) VALUES 
    ('admin@cleverreduction.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Main Admin', true);

-- Assign admin role to main admin
INSERT INTO user_roles (user_id, role) 
    SELECT id, 'admin' FROM admin_users WHERE email = 'admin@cleverreduction.com';

-- Insert sample editor and viewer accounts
INSERT INTO admin_users (email, password_hash, full_name, is_main_admin) VALUES 
    ('editor@cleverreduction.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Content Editor', false),
    ('viewer@cleverreduction.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Content Viewer', false);

-- Assign roles
INSERT INTO user_roles (user_id, role)
SELECT id, 'editor' FROM admin_users WHERE email = 'editor@cleverreduction.com'
UNION ALL
SELECT id, 'viewer' FROM admin_users WHERE email = 'viewer@cleverreduction.com';

-- Insert pricing plans
INSERT INTO pricing_plans (plan_name, display_name, price_monthly, price_yearly, description, features, max_users) VALUES 
    ('demo', 'Demo', 0.00, 0.00, 'Try our platform with sample data', 
     '["Sample emissions data", "Basic dashboard access", "Limited reporting", "Email support", "14-day trial period"]', 1),
    ('emissions_calculation', 'Emissions Calculation', 99.00, 990.00, 'Comprehensive carbon footprint tracking', 
     '["Complete emissions tracking", "Real-time data analysis", "Custom reporting", "API access", "Priority email support", "Data export functionality", "Multi-user access (up to 5)"]', 5),
    ('consultant', 'Consultant', 199.00, 1990.00, 'Full tracking with expert reduction strategies', 
     '["Everything in Emissions Calculation", "Dedicated sustainability consultant", "Custom reduction strategies", "Quarterly strategy reviews", "Industry benchmarking", "Advanced analytics & insights", "Unlimited users", "Phone & priority support"]', NULL);
