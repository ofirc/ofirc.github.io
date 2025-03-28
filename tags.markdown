---
layout: page
title: Tags
permalink: /tags/
---

<div class="tags-page">
  {% assign sorted_tags = site.tags | sort %}
  
  <div class="tag-cloud">
    <h2>All Tags</h2>
    {% for tag in sorted_tags %}
      <a href="#{{ tag[0] | slugify }}" class="tag-link" style="font-size: {{ tag[1].size | times: 4 | plus: 80 }}%">
        {{ tag[0] }} <span class="tag-count">({{ tag[1].size }})</span>
      </a>
    {% endfor %}
  </div>

  <div class="tag-list">
    {% for tag in sorted_tags %}
      <div class="tag-section" id="{{ tag[0] | slugify }}">
        <h3>{{ tag[0] }}</h3>
        <ul class="post-list">
          {% for post in tag[1] %}
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
  .tag-cloud {
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .tag-link {
    display: inline-block;
    margin: 0.5rem;
    text-decoration: none;
  }
  
  .tag-count {
    font-size: 0.8em;
    color: #666;
  }
  
  .tag-section {
    margin-bottom: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
</style>
