-- Clever Reduction Database Seed Data
-- Sample data for testing purposes

-- ============================================
-- BLOG CATEGORIES
-- ============================================

INSERT INTO blog_categories (name, slug, description) VALUES
    ('Sustainability', 'sustainability', 'Articles about sustainable business practices'),
    ('Technology', 'technology', 'Tech innovations in carbon reduction'),
    ('Case Studies', 'case-studies', 'Real-world success stories'),
    ('Industry News', 'industry-news', 'Latest news in environmental tech'),
    ('Guides', 'guides', 'How-to guides and best practices');

-- ============================================
-- SAMPLE BLOG POSTS
-- ============================================

INSERT INTO blog_posts (
    title, 
    slug, 
    excerpt, 
    content, 
    author_name, 
    status, 
    published_at,
    meta_title,
    meta_description
) VALUES
    (
        'Getting Started with Carbon Footprint Reduction',
        'getting-started-carbon-footprint-reduction',
        'Learn the fundamental steps every business should take to begin their carbon reduction journey.',
        '<h2>Introduction</h2><p>Reducing your business carbon footprint is no longer optional—it''s essential for sustainable growth and meeting regulatory requirements.</p><h2>Key Steps</h2><ul><li>Measure your current emissions</li><li>Set realistic reduction targets</li><li>Implement tracking systems</li><li>Engage your team</li></ul><p>Start your journey today with our comprehensive calculator tool.</p>',
        'Admin User',
        'published',
        NOW() - INTERVAL '7 days',
        'Carbon Footprint Reduction Guide | Clever Reduction',
        'Essential guide for businesses starting their carbon reduction journey. Learn measurement, tracking, and implementation strategies.'
    ),
    (
        '5 Technologies Transforming Emission Tracking',
        '5-technologies-transforming-emission-tracking',
        'Discover the latest technological innovations making carbon tracking more accurate and accessible.',
        '<h2>The Evolution of Carbon Tracking</h2><p>Technology is revolutionizing how businesses monitor and reduce their environmental impact.</p><h2>Top Technologies</h2><ol><li><strong>IoT Sensors</strong> - Real-time emissions monitoring</li><li><strong>AI Analytics</strong> - Predictive modeling and insights</li><li><strong>Blockchain</strong> - Transparent verification</li><li><strong>Cloud Computing</strong> - Scalable data processing</li><li><strong>Mobile Apps</strong> - On-the-go tracking</li></ol>',
        'Admin User',
        'published',
        NOW() - INTERVAL '3 days',
        '5 Technologies Transforming Emission Tracking',
        'Explore cutting-edge technologies revolutionizing carbon emission tracking for modern businesses.'
    ),
    (
        'Draft: Upcoming Features in Q2 2025',
        'upcoming-features-q2-2025',
        'A preview of exciting new features coming to Clever Reduction.',
        '<p>This is a draft post about upcoming features...</p>',
        'Admin User',
        'draft',
        NULL,
        NULL,
        NULL
    );

-- Link posts to categories
INSERT INTO blog_post_categories (post_id, category_id)
SELECT 
    bp.id, 
    bc.id
FROM blog_posts bp
CROSS JOIN blog_categories bc
WHERE 
    (bp.slug = 'getting-started-carbon-footprint-reduction' AND bc.slug IN ('guides', 'sustainability'))
    OR (bp.slug = '5-technologies-transforming-emission-tracking' AND bc.slug IN ('technology', 'industry-news'));

-- ============================================
-- SAMPLE COMMENTS
-- ============================================

INSERT INTO blog_comments (post_id, author_name, author_email, content, is_approved)
SELECT 
    id,
    'Jane Smith',
    'jane@example.com',
    'Great article! This really helped us get started with our carbon reduction program.',
    true
FROM blog_posts 
WHERE slug = 'getting-started-carbon-footprint-reduction';

INSERT INTO blog_comments (post_id, author_name, author_email, content, is_approved)
SELECT 
    id,
    'John Doe',
    'john@example.com',
    'The technology section was particularly insightful. Looking forward to more content like this!',
    true
FROM blog_posts 
WHERE slug = '5-technologies-transforming-emission-tracking';

-- ============================================
-- SAMPLE ANALYTICS DATA
-- ============================================

-- Generate sample page views for the last 30 days
INSERT INTO page_views (page_path, page_title, country, region, city, duration_seconds, viewed_at)
SELECT 
    path,
    title,
    country,
    region,
    city,
    (random() * 300 + 30)::int,
    NOW() - (random() * INTERVAL '30 days')
FROM (
    VALUES 
        ('/', 'Home', 'United States', 'California', 'San Francisco'),
        ('/blog', 'Blog', 'United Kingdom', 'England', 'London'),
        ('/pricing', 'Pricing', 'Germany', 'Bavaria', 'Munich'),
        ('/about', 'About', 'Canada', 'Ontario', 'Toronto'),
        ('/product/calculator', 'Calculator', 'United States', 'New York', 'New York'),
        ('/contact', 'Contact', 'Australia', 'New South Wales', 'Sydney')
) AS pages(path, title, country, region, city)
CROSS JOIN generate_series(1, 50);

-- ============================================
-- SAMPLE CONTACT SUBMISSIONS
-- ============================================

INSERT INTO contact_submissions (name, email, company, phone, message, form_type, created_at)
VALUES
    (
        'Sarah Johnson',
        'sarah.johnson@techcorp.com',
        'TechCorp Industries',
        '+1-555-0123',
        'We are interested in implementing carbon tracking for our 500+ employee organization. Please contact us to discuss enterprise options.',
        'sales',
        NOW() - INTERVAL '2 days'
    ),
    (
        'Michael Chen',
        'mchen@greenstart.com',
        'GreenStart Solutions',
        '+1-555-0456',
        'I would like to schedule a demo to see how your platform works for small businesses.',
        'demo',
        NOW() - INTERVAL '5 days'
    ),
    (
        'Emma Williams',
        'emma.w@example.com',
        NULL,
        NULL,
        'What is your pricing for a team of 50 people?',
        'contact',
        NOW() - INTERVAL '1 day'
    );

-- ============================================
-- COMPANY PAGES SAMPLE DATA
-- ============================================

INSERT INTO company_pages (page_slug, page_title, content, is_published, meta_title, meta_description) VALUES
    ('careers', 'Join Our Team', 'We are always looking for talented individuals who are passionate about sustainability and making a positive impact on the environment. Explore our current openings and become part of our mission to reduce carbon emissions globally.', true, 'Careers at Clever Reduction', 'Join our team and help build a sustainable future. Explore career opportunities at Clever Reduction.'),
    ('contact', 'Contact Us', 'Get in touch with us for any inquiries, support, or partnership opportunities. Our team is here to help you on your sustainability journey.', true, 'Contact Clever Reduction', 'Get in touch with our team. We are here to help with your sustainability goals.'),
    ('press', 'Press & Media', 'Latest news, press releases, and media resources about Clever Reduction. Download our media kit and stay updated with our latest announcements.', true, 'Press & Media - Clever Reduction', 'Latest news and press releases from Clever Reduction. Media kit and resources available.'),
    ('partners', 'Our Partners', 'We collaborate with leading organizations worldwide to drive sustainability initiatives and carbon reduction efforts. Learn more about our partnerships and how to become a partner.', true, 'Partners - Clever Reduction', 'Explore our partnerships and collaboration opportunities for sustainable business growth.');

-- ============================================
-- RESOURCES PAGES SAMPLE DATA
-- ============================================

INSERT INTO resource_pages (page_slug, page_title, content, is_published, meta_title, meta_description) VALUES
    ('webinars', 'Sustainability Webinars', 'Join our expert-led webinars to learn about carbon reduction strategies, sustainability best practices, and the latest industry trends. Register for upcoming sessions or watch recordings of past webinars.', true, 'Webinars - Clever Reduction', 'Join expert-led webinars on sustainability and carbon reduction. Learn best practices and industry insights.'),
    ('guide', 'Sustainability Guide', 'Your comprehensive guide to implementing sustainable practices in your organization. Learn actionable strategies, best practices, and proven methods for reducing your carbon footprint.', true, 'Sustainability Guide - Clever Reduction', 'Comprehensive guide to sustainability and carbon reduction. Actionable strategies for your organization.'),
    ('standards', 'Carbon Standards & Certifications', 'Understand the major carbon accounting standards, certifications, and frameworks used globally. Learn about GHG Protocol, ISO 14064, Science Based Targets, and more.', true, 'Carbon Standards - Clever Reduction', 'Learn about carbon accounting standards and certifications including GHG Protocol and ISO 14064.'),
    ('case-studies', 'Customer Success Stories', 'Discover how organizations across different industries are achieving their sustainability goals with Clever Reduction. Real stories, real impact, real results.', true, 'Case Studies - Clever Reduction', 'Customer success stories and real-world examples of carbon reduction achievements.'),
    ('documentation', 'Technical Documentation', 'Complete technical documentation for developers and technical teams. API references, integration guides, SDKs, and best practices for implementing Clever Reduction in your systems.', true, 'Documentation - Clever Reduction', 'Technical documentation, API references, and integration guides for developers.');

-- ============================================
-- UPDATE STATISTICS
-- ============================================

-- Update blog post view counts based on analytics
UPDATE blog_posts
SET view_count = (
    SELECT COUNT(*)
    FROM page_views
    WHERE page_path LIKE '/blog/' || blog_posts.slug
);

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Verify data was inserted correctly
DO $$
DECLARE
    post_count INT;
    comment_count INT;
    category_count INT;
    company_count INT;
    resource_count INT;
BEGIN
    SELECT COUNT(*) INTO post_count FROM blog_posts;
    SELECT COUNT(*) INTO comment_count FROM blog_comments;
    SELECT COUNT(*) INTO category_count FROM blog_categories;
    SELECT COUNT(*) INTO company_count FROM company_pages;
    SELECT COUNT(*) INTO resource_count FROM resource_pages;
    
    RAISE NOTICE 'Seed data inserted successfully!';
    RAISE NOTICE '  - Blog posts: %', post_count;
    RAISE NOTICE '  - Comments: %', comment_count;
    RAISE NOTICE '  - Categories: %', category_count;
    RAISE NOTICE '  - Company pages: %', company_count;
    RAISE NOTICE '  - Resource pages: %', resource_count;
END $$;
