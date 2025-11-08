# Clever Reduction Database Setup

## Overview

This directory contains SQL schema files for setting up the Clever Reduction database on your own hosting.

## Important: Two Options

### Option 1: Self-Hosting (Complex)
Use these SQL files to set up your own PostgreSQL database. Requires:
- PostgreSQL server (v12+)
- Backend API server to connect frontend to database
- Security configuration (SSL, authentication, etc.)
- Hosting infrastructure management

### Option 2: Lovable Cloud (Recommended - Much Easier!)
Enable Lovable Cloud for automatic database setup with:
- ✅ Zero configuration required
- ✅ Built-in authentication
- ✅ Automatic API generation
- ✅ File storage included
- ✅ Serverless functions
- ✅ No external accounts needed

**Ask me to enable Lovable Cloud for instant database integration!**

---

## Self-Hosting Setup Instructions

### Prerequisites

- PostgreSQL 12 or higher
- Database admin access
- Node.js backend server (not included)

### Files

- `schema.sql` - Main database schema with all tables
- `seed.sql` - Sample data for testing
- `migrations/` - Future database updates

### Installation Steps

1. **Create Database**
```bash
createdb clever_reduction
```

2. **Run Schema**
```bash
psql -d clever_reduction -f schema.sql
```

3. **Run Seed Data (optional)**
```bash
psql -d clever_reduction -f seed.sql
```

4. **Set Environment Variables**
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/clever_reduction
```

### Database Tables

#### Authentication & Authorization
- `admin_users` - Admin user accounts with bcrypt password hashing
- `user_roles` - Role assignments (admin, editor, viewer) in separate table for security
- Security functions: `has_role()`, `is_admin()` for role checking without RLS recursion

#### Blog System
- `blog_posts` - Blog articles
- `blog_comments` - Post comments
- `blog_categories` - Content categories
- `blog_post_categories` - Category associations

#### Analytics
- `page_views` - Individual page visits
- `visitor_sessions` - User session tracking

#### Business
- `contact_submissions` - Contact form data

### Security Notes

⚠️ **CRITICAL SECURITY REQUIREMENTS**:

1. **Change Default Password**: The default admin password is `admin123`. Change immediately!
   ```javascript
   const bcrypt = require('bcrypt');
   const hash = await bcrypt.hash('your-secure-password', 10);
   ```

2. **Role-Based Access Control**: 
   - Roles are stored in a separate `user_roles` table (NEVER on user profiles)
   - Use `has_role()` and `is_admin()` security definer functions to check permissions
   - These functions prevent recursive RLS policy issues

3. **Main Admin Protection**:
   - The main admin account cannot be deleted (database trigger enforced)
   - Only main admins should be able to create other admins

4. **Row Level Security (RLS)**:
   - All tables should have RLS enabled
   - Use the security definer functions in your RLS policies
   
   Example policy:
   ```sql
   CREATE POLICY "Only admins can manage users"
   ON admin_users FOR ALL
   TO authenticated
   USING (public.is_admin(auth.uid()));
   ```

### Backend Integration Required

These database files only create the database structure. You need:

1. **Backend API Server** (Node.js/Express, Python/Flask, etc.)
2. **API Endpoints** for CRUD operations
3. **Authentication Middleware**
4. **CORS Configuration**
5. **Environment Variables**
6. **Database Connection Pool**

### Sample Backend Connection (Node.js)

```javascript
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Example query
app.get('/api/blog/posts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE status = $1 ORDER BY published_at DESC',
      ['published']
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### Maintenance

- Regular backups: `pg_dump clever_reduction > backup.sql`
- Monitor query performance
- Update indexes as needed
- Review logs regularly

### Migrations

Future schema changes will be added to `migrations/` directory with timestamps.

---

## Recommended: Use Lovable Cloud Instead

Self-hosting requires significant setup and maintenance. **Lovable Cloud gives you everything above with zero configuration.**

Just ask: "Enable Lovable Cloud" and you'll have a fully functional database in seconds!
