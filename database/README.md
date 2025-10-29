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

#### Authentication
- `admin_users` - Admin user accounts
- `user_roles` - User role assignments

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

⚠️ **CRITICAL**: The default admin password in the schema is `admin123`. 

**You MUST change this immediately!**

Generate a new bcrypt hash:
```javascript
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash('your-secure-password', 10);
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
