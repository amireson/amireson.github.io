---
layout: home
title: Software
seq: 4 
---

<hr>
## Richards Equation Solvers

Richards' Equation describes the movement of water through the soil and the unsaturated zone. It is often applied to simulate the vertical exchange of moisture between the land and atmosphere. If you are new to python, you might like to have a look at [this](https://openre.render.com) web hosted 1D Richards' Equation solver written in python for teaching purposes. Please note, this tool is a little slow - it will run much faster on a laptop/desktop computer. Some explanation is given in the video below

<iframe width="560" height="315" src="https://www.youtube.com/embed/1nNYO9XL6wc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you are comfortable with python and know about makefiles, [here](https://github.com/amireson/openRE) is an improved 1D Richards' Equation solver. This uses the numba JIT compiler, and as such is significantly faster.

If you prefer MATLAB you can try [this model](https://github.com/amireson/TransientUZFlow). Note, in my experience python ODE solvers, such as those used to solve Richards' equation, can be simply configured to run 5-10 times faster than those in MATLAB, so if you're starting out, I would recommend python.

<br>
<br>
<hr>

## Hydrology of world cities

[Here](https://github.com/amireson/HydrologyOfWorldCities) is a script that estimates average monthly rainfall and potential evapotranpiration for any major world city. The script obtains monthly climate data from the WMO website, and location data from the python basemap library. Potential evapotranspiration is estimated using the FAO 56 method. This information provides a first order understanding of the hydrology of any particular location.

This script is written in jupyter notebook, using python version 3.6

<img src="{{site.baseurl}}/files/images/Map.png" alt='map' style='width: 30%'>
<img src="{{site.baseurl}}/files/images/Precip.png" alt='precip' style='width: 65%'>

<br>
<br>
<hr>
