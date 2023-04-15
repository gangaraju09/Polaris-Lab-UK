# Polaris Lab UK
<b>Team Members :</b> <a href="https://sidrcs.github.io/maps/index.html"> Chinna Subbaraya Siddharth (Sid) Ramavajjala*</a>, <a href="https://gangaraju09.github.io/index.html"> Ramakrishna Raju Gangaraju*</a><br>
<i>*Department of Geography, University of Wisconsin - Madison</i>
<p><ul><li>Course code: <b>Geog 575</b></li> <li>Course Name: <b>Interactive Cartography & Geovisualization</b> (<a href = "https://geography.wisc.edu/cartography/education/G575/G575SP2022.html">click here</a>)</li><li>Instructor: <b>Professor Robert E Roth</b> (<a href="https://geography.wisc.edu/gis/staff/roth-robert/">click here</a>)</li> <li>Teaching Assistant: <b>Gareth Baldrica - Franklin</b> (<a href="https://geography.wisc.edu/staff/baldrica-franklin-gareth/">click here</a>)</li></ul></p>

<h3><b><ins>Target User Profile</ins>:</b></h3>
<b>Name & Position:</b> Sid Garcia, Associate Professor <br>
<b>Background Description 1:</b> Sid is an associate professor in the political science and economics department at the University of Madrid, Spain. Sid's primary area of study includes the quantification of political polarization, the impact of policies on the economy and environment, and the behavioral analysis of voters across Europe. She teaches introduction to statistical analysis for political science, dynamic macroeconomics, and political Economy. She would use interactive web maps as a <b><ins>one-way learning</ins></b> material. Through the map, she and her students want to <b><ins>identify</ins></b> various features on the map and compare them to socio-economic indicators and generate detailed reports. Therefore, she would like export different maps to include them in reports. She wants to <b><ins>rank</b></ins>, <b><ins>identify</b></ins>, <b><ins>compare</b></ins> the most and least, and identify <b><ins>outliers/anomalies</b></ins>. In addition, she wants to understand insights pertaining to <b><ins>trends</b></ins> across the temporal domain.<br>
<br>
<b>Name & Position:</b> Raju Braverman, Member of Parliament (MP) <br>
<b>Background Description 2</b>  Raju's goal is to lead her party to win the most seats in the House of Commons. To achieve this goal, she needs to appeal to voters by addressing their needs and concerns. Therefore, it is essential to understand the demographics (socio-economic correlates) and extent of polarization that would influence voter preferences. To gain insights into the aforementioned factors, the visualization would act as <b><ins>presentation</b></ins> tool to comprehend election insights. By procuring and presenting data on demographics, employment rates, median income, and other factors, she would want to identify <b><ins>patterns</b></ins> and <b><ins>trends</b></ins> that can inform campaign strategy. she wants the map to <b><ins>enable</b></ins> her to <b><ins>compare</b></ins> and <b><ins>rank</b></ins> different states polarization scenarios based on their political variables, identify clusters or spikes of voter preferences, and <b><ins> associate </b></ins> specific policies with different voter groups. Thereby Sarah wants to deliver a constructive campaign message and sequence her activities to reach voters effectively. In addition, she wants to print and circulate maps to personalize her campaign plans with her party workers, therefore map should be a <b><ins> two-way learning</b></ins> material.

<h3><b><ins>Use Case Scenario</ins>:</b></h3>
<b>Scenario #1:</b> When the interactive is clicked, a display panel outlines details to user. Furthermore, a precise entry point is designed for the user to select a type of mode - <b>exploration</b> followed by selection of state, two other variables from selection panel. The dashboard dynamically generates a scatter plot and bivariate choropleth + proportional symbol map. The user can <b><ins>associate</b></ins> if the variables are correlated and could <b><ins>analyze</b></ins> if there are any similar or dissimilar <b><ins>trends</b></ins> over the years. Moreover, the user can hover over various map objects available and <b><ins>identify</b></ins> information related to location (map) and attributes (graph).<br>
<br>
<b>Scenario #2:</b> When the interactive is clicked and followed by the display panel. The user selects <b>presentation</b> mode followed by state and a variable selection. Moreover, the user <b><ins>sequences</b></ins> through different years to <b><ins>rank</b></ins> states with the least and most polarization. When hovered on State, a dynamic popup is enabled and, when clicked, <b><ins>retrieves</b></ins> information about other state (which are not selected). The user can also <b><ins>overlay</b></ins> election candidate point data to <b><ins>compare</b></ins> voter mindset based on selected attributes. Next, the user wants to detect <b><ins>anomalies</b></ins> performed through a scatter plot. Moreover, the sequence helps with insights if the <b><ins>pattern</b></ins> changes over time.<br>

<h3><b><ins>Requirements Document</ins>:</b></h3>
<i>* Planned, need to discuss with Prof Roth or Gareth</i>
For requirements documentation, we have attempted to adhere to Shneiderman's mantra - overview first, zoom and filter, details-on-demand.
<table> <tr><th colspan="2">Map Presentation</th></tr>
<tr><td><b>Basemap (Map layer)</b></td>	<td>England State - No base map (https://geoportal.statistics.gov.uk/)</td></tr>
<tr><td><b>Non-spatial data</b></td>	<td>British Household Panel Survey data (BHPS) (https://beta.ukdataservice.ac.uk/datacatalogue/studies/study?id=5151#!/access-data), Income Inequality, Median Income, Employed Share, Native share, Eduaction variablity, Job status variability, Age variation, Population (https://www.ons.gov.uk/)</td></tr>
<tr><td><b>Method (background)*</b></td>	<td>Political Polarization in the UK (https://link.springer.com/article/10.1007/s10602-022-09368-8)</td></tr>
<tr><td><b>Scatter plot</b></td>	<td>Relationship between selected variables by State (2D) </td></tr>
<tr><td><b>Bivariate thematic map</b></td>	<td>Represents relationships between variables with a choropleth map and represent other selected variable with propotional symbol </td></tr>
<tr><td><b>Legend</b></td>	<td>Color legend for classification of data across all map types (uni and bivariate choropleths)</td></tr>
<tr><td><b>Overview</b></td>	<td>Robust documentation on polarization measurements, "how to use," and credits</td></tr> </table>

<table> <tr><th colspan="2">Interaction Section</th></tr>
<tr><td><b>Interface type dropdown</b></td>	<td>Filter + space-time-attributes (presentation). User can select and customize the map either presentation mode or exploration mode</td></tr>
<tr><td><b>Check box button</b></td>	<td>Overlay + space-alone. Turn on/off the election candidate layer for different years</td></tr>
<tr><td><b>State dropdown</b></td> <td>Filter + space-alone. Select a State for highlights across the whole dashboard.</td></tr>
<tr><td><b>Slider</b></td>	<td>Sequence + space-in-time. When clicked on the forward and backward buttons, the values are changed along with the symbolization</td></tr>
<tr><td><b>Menu</b></td>	<td>Filter + attributes-in-space. Attributes selection through nested dropdown (1D)* for variable selection</td></tr>
<tr><td><b>Print button*</b></td>	<td>Enabling + space, attributes-in-space. When clicked, export the current map view as PDF/PNG*.</td></tr>
<tr><td><b>Hover</b></td>	<td>Retrieve + attributes-in-space, space. Dynamic popups are enabled with a highlighting enabled to show locations. And click supports identify (details on demand)</td></tr></table>

<h3><b><ins>Lo-Fi wireframes</ins>:</b></h3>
<br>
<img src = "https://github.com/gangaraju09/Geog_575_Final_Project/blob/main/assets/Scenario%231.jpg?raw=true">
<img src = "https://github.com/gangaraju09/Geog_575_Final_Project/blob/main/assets/Scenario%232.jpg?raw=true">






