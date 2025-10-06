# Use official nginx image
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy your static site files into the nginx web directory
COPY ./dist/dotcms-news-list/browser/ /usr/share/nginx/html

# Copy a custom nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx (this is the default, but we can make it explicit)
CMD ["nginx", "-g", "daemon off;"]
