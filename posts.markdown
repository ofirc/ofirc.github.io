---
layout: page
title: Posts
permalink: /posts/
---

<div class="posts-page">
  <h2>All Posts</h2>
  
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        <h3>
          <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
        </h3>
        {% if post.description %}
          <p class="post-description">{{ post.description }}</p>
        {% endif %}
        <div class="post-metadata">
          {% if post.categories.size > 0 %}
            <span class="post-categories">
              <strong>Categories:</strong>
              {% for category in post.categories %}
                <a href="/categories/#{{ category | slugify }}">{{ category }}</a>{% unless forloop.last %}, {% endunless %}
              {% endfor %}
            </span>
          {% endif %}
          
          {% if post.tags.size > 0 %}
            <span class="post-tags">
              <strong>Tags:</strong>
              {% for tag in post.tags %}
                <a href="/tags/#{{ tag | slugify }}">{{ tag }}</a>{% unless forloop.last %}, {% endunless %}
              {% endfor %}
            </span>
          {% endif %}
        </div>
      </li>
    {% endfor %}
  </ul>
</div>

<style>
  .posts-page {
    margin-bottom: 2rem;
  }
  
  .post-list {
    list-style: none;
    padding-left: 0;
  }
  
  .post-list li {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .post-metadata {
    font-size: 0.9rem;
    color: #666;
    margin-top: 0.5rem;
  }
  
  .post-categories, .post-tags {
    display: block;
    margin-top: 0.25rem;
  }
  
  .post-description {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
</style>
