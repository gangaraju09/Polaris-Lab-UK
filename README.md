# Polaris Lab UK
<b>Team Members :</b> <a href="https://sidrcs.github.io/maps/index.html"> Chinna Subbaraya Siddharth (Sid) Ramavajjala*</a>, <a href="https://gangaraju09.github.io/index.html"> Ramakrishna Raju Gangaraju*</a><br>
<i>*Department of Geography, University of Wisconsin - Madison</i>
<p><ul><li>Course code: <b>Geog 575</b></li> <li>Course Name: <b>Interactive Cartography & Geovisualization</b> (<a href = "https://geography.wisc.edu/cartography/education/G575/G575SP2022.html">click here</a>)</li><li>Instructor: <b>Professor Robert E Roth</b> (<a href="https://geography.wisc.edu/gis/staff/roth-robert/">click here</a>)</li> <li>Teaching Assistant: <b>Gareth Baldrica - Franklin</b> (<a href="https://geography.wisc.edu/staff/baldrica-franklin-gareth/">click here</a>)</li></ul></p>

<h3><b><ins>Target User Profile</ins>:</b></h3>
<b>Name & Position:</b> Isabel Hector Garcia, Associate Professor <br>
<b>Background Description 1:</b> Isabel is an associate professor in the Political Science and Economics department at the University of Madrid, Spain. Isabel's primary area of study includes the quantification of political polarization, the impact of policies on the economy and environment, and the behavioral analysis of voters across Europe. She teaches Introduction to statistical analysis for Political Science, Dynamic Macroeconomics, and Political Economy. She would use interactive web maps as a <b><ins>two-way learning</ins></b> material to teach students. Through the map, she and her students want to <b><ins>identify</ins></b> various features on the map and compare them to socio-economic indicators. She wants to <b><ins>rank</b></ins>, <b><ins>identify</b></ins>, <b><ins>compare</b></ins> the most and least, and identify <b><ins>outliers/anomalies</b></ins>. In addition, she wants to understand insights pertaining to <b><ins>trends</b></ins> across the temporal domain.<br>
<br>
<b>Background Description 2</b>  As a political candidate of the UK, Candidate goal is to lead his/her party to win the most seats in the House of Commons. To achieve this goal, need to appeal to voters across the country by addressing their needs and concerns. Therefore, it is essential to understand the demographic and socio-economic factors that influence voter preferences. To gain insights into these factors, our interactive visualization project will <b><ins>present</b></ins> insights into previous election stats. By <b><ins>procuring</b></ins> and Presenting data on voting demographics, employment rates, median income, and other factors, we will <b><ins>identify</b></ins> patterns and <b><ins>pattern</b></ins>that can inform your campaign strategy. Our project will also <b><ins>enable</b></ins> you to <b><ins>compare</b></ins> and <b><ins>Rank</b></ins> different State based on their political variables, identify clusters or spikes of voter preferences, and associate specific policies with different voter groups. This will allow you to <b><ins>Reexpress</b></ins> your campaign message, arrange your resources, and sequence your activities to reach voters effectively.

In addition, we will provide <b><ins>Enalbling</b></ins> operators such as exporting and saving to allow you to customize and personalize your campaign plans. By utilizing the insights and recommendations from our project, you can tailor your election campaign to specific State needs, persuade voters to support your party's platform and increase your chances of winning a majority of seats in the House of Commons of the UK

<h3><b><ins>Use Case Scenario</ins>:</b></h3>
<b>Scenario #1:</b> When the interactive is clicked, a display panel showcases outline details the user should understand. Furthermore, a precise entry point is designed for the user to select a State from the dropdown and select two variables from the menu. The dashboard dynamically creates a scatter plot and bivariate choropleth for the selected variables. The user can <b><ins>associate</b></ins> if the variables are correlated and could <b><ins>analyze</b></ins> if there are any similar or dissimilar <b><ins>trends</b></ins> over the years. Moreover, the user can hover over various map objects available and <b><ins>identify</b></ins> information related to location (map) and attributes (graph).<br>
<br>
<b>Scenario #2:</b> When the interactive is clicked and followed by the display panel. The user needs to proceed with the selection of State and single variable. Moreover, the user can <b><ins>sequence</b></ins> through different years to <b><ins>rank</b></ins> State with the least and most polarization. When hovered on State, a dynamic popup is enabled and, when clicked, <b><ins>retrieves</b></ins> information about other State (which are not selected). The user can also <b><ins>overlay</b></ins> election candidate point data to <b><ins>compare</b></ins> voter mindset based on selected attributes. Next, the user wants to detect <b><ins>anomalies</b></ins> performed through a scatter plot. Moreover, the sequence helps with insights if the <b><ins>pattern</b></ins> changes over time.<br>

<h3><b><ins>Requirements Document</ins>:</b></h3>
<i>* Planned, need to discuss with Prof Roth or Gareth</i>
<table> <tr><th colspan="2">Map Presentation</th></tr>
<tr><td><b>Basemap (Map layer)</b></td>	<td>England State - No base map (https://geoportal.statistics.gov.uk/)</td></tr>
<tr><td><b>Non Spatial Data</b></td>	<td>British Household Panel Survey data (BHPS) (https://beta.ukdataservice.ac.uk/datacatalogue/studies/study?id=5151#!/access-data), Income Inequality, Median Income, Employed Share, Native share, Eduaction variablity, Job status variability, Age variation, Population (https://www.ons.gov.uk/)</td></tr>
<tr><td><b> </b></td>	<td> </td></tr>
<tr><td><b>Method (background)*</b></td>	<td>Political Polarization in the UK (https://link.springer.com/article/10.1007/s10602-022-09368-8)</td></tr>
<tr><td><b>Scatter Plot</b></td>	<td>Relationship between selected variables by State (2D) </td></tr>
<tr><td><b>Thematic map</b></td>	<td>Represents relationships across other State with choropleth theme and also represent other variable difference across states based on variable selection with propotional theme </td></tr>
<tr><td><b>Legend</b></td>	<td>Color legend for classification of data across all map types (uni and bivariate choropleths)</td></tr>
<tr><td><b>Overview</b></td>	<td>Robust documentation on polarization measurements, "how to use," and credits</td></tr> </table>

<table> <tr><th colspan="2">Interaction Section</th></tr>
<tr><td><b>Stage of Science Dropdown</b></td>	<td>User can select, how the map should look, either presentation mode or exploration mode</td></tr>
<tr><td><b>Radio button</b></td>	<td>Overlay + space-alone. Turn on/off the election candidate layer for different years</td></tr>
<tr><td><b>State dropdown</b></td> <td>Filter + space-alone. Select a State for highlights across the whole dashboard.</td></tr>
<tr><td><b>Slider</b></td>	<td>Sequence + space-in-time. When clicked on the forward and backward buttons, the values are changed along with the symbolization</td></tr>
<tr><td><b>Menu</b></td>	<td>Filter + attributes-in-space. Attributes selection through nested dropdown (1D)</td></tr>
<tr><td><b>Print button*</b></td>	<td>Enabling + space, attributes-in-space. When clicked, export the current map view as PDF.</td></tr>
<tr><td><b>Hover</b></td>	<td>Retrieve + attributes-in-space, space. Dynamic popups are enabled with a highlighting enabled to show locations. And click supports identify (details on demand)</td></tr>
<tr><td><b>Overlay </b></td>	<td>To overlay one varible information on different timeline </td></tr> </table>

<h3><b><ins>Lo-Fi wireframes</ins>:</b></h3>
<br>
<img src = "https://github.com/gangaraju09/Geog_575_Final_Project/blob/main/assets/Scenario%231.jpg?raw=true">
<img src = "https://github.com/gangaraju09/Geog_575_Final_Project/blob/main/assets/Scenario%232.jpg?raw=true">






