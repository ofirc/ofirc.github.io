---
layout: home
title: Home
---

<div class="home-intro">
  <img src="/assets/images/ofir-profile-circular.png" alt="Ofir Cohen" class="profile-img" style="float: right; margin-left: 20px; margin-bottom: 20px; max-width: 150px; border-radius: 50%;">
  
  <h1>Welcome to My Blog!</h1>
  
  <p>
    Hi, I'm <strong>Ofir Cohen</strong>, CTO of Container Security at <a href="https://www.wiz.io">Wiz</a>. 
    This blog is where I share my thoughts, experiences, and technical insights on Kubernetes, 
    Go programming, container security, cloud native technologies, and more.
  </p>
  
  <p>
    Feel free to explore my posts below or browse by <a href="/categories/">categories</a> and <a href="/tags/">tags</a>.
  </p>
</div>

<div class="featured-topics">
  <h2>Featured Topics</h2>
  <div class="topic-grid">
    <a href="/tags/#kubernetes" class="topic-card">
      <h3>Kubernetes</h3>
      <p>Deployment strategies, security best practices, and networking in Kubernetes</p>
    </a>
    <a href="/tags/#go" class="topic-card">
      <h3>Go Programming</h3>
      <p>Tutorials, patterns, and real-world applications in Go</p>
    </a>
    <a href="/tags/#networking" class="topic-card">
      <h3>Networking</h3>
      <p>Deep dives into Kubernetes networking, proxies, and service meshes</p>
    </a>
    <a href="/tags/#security" class="topic-card">
      <h3>Security</h3>
      <p>Container security, zero-trust networking, and secure cloud deployments</p>
    </a>
  </div>
</div>

<h2>Recent Posts</h2>

<style>
  .home-intro {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .featured-topics {
    margin-bottom: 2rem;
  }
  
  .topic-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .topic-card {
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 5px;
    text-decoration: none;
    color: inherit;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .topic-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .topic-card h3 {
    margin-top: 0;
    color: #0366d6;
  }
  
  .topic-card p {
    margin-bottom: 0;
    font-size: 0.9rem;
  }
</style>
