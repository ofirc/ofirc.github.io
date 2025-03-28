---
layout: page
title: Categories
permalink: /categories/
---

<div class="categories-page">
  {% assign sorted_categories = site.categories | sort %}
  
  <div class="category-cloud">
    <h2>All Categories</h2>
    {% for category in sorted_categories %}
      <a href="#{{ category[0] | slugify }}" class="category-link" style="font-size: {{ category[1].size | times: 4 | plus: 80 }}%">
        {{ category[0] }} <span class="category-count">({{ category[1].size }})</span>
      </a>
    {% endfor %}
  </div>

  <div class="category-list">
    {% for category in sorted_categories %}
      <div class="category-section" id="{{ category[0] | slugify }}">
        <h3>{{ category[0] }}</h3>
        <ul class="post-list">
          {% for post in category[1] %}
            <li>
              <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
              <h4>
                <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
              </h4>
            </li>
          {% endfor %}
        </ul>
      </div>
    {% endfor %}
  </div>
</div>

<style>
  .category-cloud {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .category-link {
    display: inline-block;
    margin: 0.5rem;
    text-decoration: none;
  }
  
  .category-count {
    font-size: 0.8em;
    color: #666;
  }
  
  .category-section {
    margin-bottom: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
</style>
