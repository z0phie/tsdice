# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Security Considerations

### Development Dependencies

This project has known security vulnerabilities in development dependencies (esbuild) that **only affect the development server** and do not impact production builds:

```
esbuild <=0.24.2
Severity: moderate
Issue: Development server can accept requests from any website
Impact: Development environment only (NOT production)
Status: Low priority - requires upgrading to Vite 7 (breaking changes)
```

**Important Notes:**

1. **Production builds are NOT affected** - The vulnerability only exists in the Vite dev server
2. **Development server is for local use only** - Never expose your dev server to the internet
3. **Mitigation:**
   - Only run `npm run dev` on localhost
   - Never expose port 3000 to public networks
   - Use `npm run build` and `npm run preview` for testing production builds

### Best Practices for Development

When running the development server (`npm run dev`):

- ✅ Run only on `localhost` (127.0.0.1)
- ✅ Use a local network firewall
- ✅ Never expose the dev server to the internet
- ❌ Don't run dev server in production environments
- ❌ Don't expose port 3000 publicly

### Production Security

Production builds are secure and include:

- No development-only vulnerabilities
- Minified and optimized code
- No source maps by default
- Proper content security practices

### Dependency Management

We regularly monitor dependencies and update them when:

1. Security vulnerabilities affect production builds
2. Updates provide significant security improvements
3. Critical vulnerabilities are discovered

### Reporting a Vulnerability

If you discover a security vulnerability in tsDice, please:

1. **Do NOT** open a public GitHub issue
2. Email the maintainer directly (check GitHub profile)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

### Security Updates

Security updates will be released as:

- **Critical:** Immediate patch release
- **High:** Patch within 7 days
- **Moderate/Low:** Next minor release

## Safe Usage

This project is designed for:

- ✅ Creating and sharing particle animation configurations
- ✅ Educational and creative exploration
- ✅ Embedding in safe, trusted websites

This project should NOT be used for:

- ❌ Processing untrusted user input without validation
- ❌ Handling sensitive user data
- ❌ Security-critical applications

## Content Security Policy

If embedding tsDice in your website, consider using CSP headers:

```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

Note: `unsafe-inline` is needed for particle animations. Evaluate based on your security requirements.

## Data Privacy

- No user data is collected or transmitted to external servers
- All particle configurations are generated and stored locally
- Shared URLs contain only particle configuration data (compressed)
- No analytics, tracking, or third-party scripts

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
