---
layout: home
title: People
seq: 2  
---

{% assign sortedpeople = site.people | sort: 'seq' %}
{% for p in sortedpeople %}
<hr>
<div class="row">
<div class="people" >
<h1>{{p.name}}</h1>
{% if p.showemail == 1 %}
<a class="u-email" href="mailto:{{ p.email }}">{{ p.email }}</a><br>
{% endif %}
{{p.role}}<br>
{{p.afil1}} <br>
{{p.afil2}} <br>
{{p.afil3}} 
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

