---
layout: home
title: People
---
{% for p in site.people %}
<hr>
<div class="row">
<div class="people">
<h1>{{p.name}}</h1>
{{p.role}}<br>
{% if p.showemail == 1 %}
<a class="u-email" href="mailto:{{ p.email }}">{{ p.email }}</a><br>
{% endif %}
</div>
<div class="people">
{{p.content | markdownify}}
<br>
</div>
<div class="people">
<img src="{{site.baseurl}}/files/images/{{p.pic}}" alt="{{p.name}}" width="300pt" style="float: right;" >
</div>
</div>

{% endfor %}

