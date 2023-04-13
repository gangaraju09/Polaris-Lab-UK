# Polaris Lab UK
<b>Team Members :</b> <a href="ramavajjala@wisc.edu"> Chinna Subbaraya Siddharth (Sid) Ramavajjala*</a>, <a href="grk.gangaraju@wisc.edu"> Ramakrishna Raju Gangaraju*</a><br>
<i>*Department of Geography, University of Wisconsin - Madison</i>
<p>Course Name: <b>Interactive Cartography & Geovisualization</b>(<a href = "https://geography.wisc.edu/cartography/education/G575/G575SP2022.html">click here</a>)<br> Instructor: <b>Professor Robert E Roth</b>(<a href="https://geography.wisc.edu/gis/staff/roth-robert/">click here</a>)<br> Teaching Assistant: <b>Gareth Baldrica - Franklin</b>(<a href="https://geography.wisc.edu/staff/baldrica-franklin-gareth/">click here</a>)</p>

<h3><b><ins>Target User Profile</ins>:</b></h3>
<b>Name & Position:</b> Isabel Hector Garcia, Associate Professor <br>
<b>Background Description:</b> Isabel is an associate professor in the Political Science and Economics department at the University of Madrid, Spain. Isabel's primary area of study includes the quantification of political polarization, the impact of policies on the economy and environment, and the behavioral analysis of voters across Europe. She teaches Introduction to statistical analysis for Political Science, Dynamic Macroeconomics, and Political Economy. She would use interactive web maps as a <b><ins>two-way learning</ins></b> material to teach students. Through the map, she and her students want to <b><ins>identify</ins></b> various features on the map and compare them to socio-economic indicators. She wants to <b><ins>rank</b></ins>, <b><ins>identify</b></ins>, <b><ins>compare</b></ins> the most and least, and identify <b><ins>outliers/anomalies</b></ins>. In addition, she wants to understand insights pertaining to <b><ins>trends</b></ins> across the temporal domain.<br>
<h3><b><ins>Use Case Scenario</ins>:</b></h3>
<b>Scenario #1:</b> When the interactive is clicked, a display panel showcases outline details the user should understand. Furthermore, a precise entry point is designed for the user to select a county from the dropdown and select two variables from the menu. The dashboard dynamically creates a scatter plot and bivariate choropleth for the selected variables. The user can <b><ins>associate</b></ins> if the variables are correlated and could <b><ins>analyze</b></ins> if there are any similar or dissimilar <b><ins>trends</b></ins> over the years. Moreover, the user can hover over various map objects available and <b><ins>identify</b></ins> information related to location (map) and attributes (graph).<br>
<br>
<b>Scenario #2:</b> When the interactive is clicked and followed by the display panel. The user needs to proceed with the selection of county and single variable. Moreover, the user can <b><ins>sequence</b></ins> through different years to <b><ins>rank</b></ins> counties with the least and most polarization. When hovered on counties, a dynamic popup is enabled and, when clicked, <b><ins>retrieves</b></ins> information about other counties (which are not selected). The user can also <b><ins>overlay</b></ins> election candidate point data to <b><ins>compare</b></ins> voter mindset based on selected attributes. Next, the user wants to detect <b><ins>anomalies</b></ins> performed through a scatter plot. Moreover, the sequence helps with insights if the <b><ins>pattern</b></ins> changes over time.<br>

<h3><b><ins>Requirements Document</ins>:</b></h3>
<i>* Planned, need to discuss with Prof Roth or Gareth</i>
<table> <tr><th colspan="2">Map Presentation</th></tr>
<tr><td><b>Basemap (Map layer)</b></td>	<td>England Counties - No base map (https://geoportal.statistics.gov.uk/)</td></tr>
<tr><td><b>Election Seats</b></td>	<td>Elected candidates overlay by the party using nominal colors (https://www.electoralcalculus.co.uk/openseatmap.html)</td></tr>
<tr><td><b>Choropleth data</b></td>	<td>British Household Panel Survey data (BHPS) (https://beta.ukdataservice.ac.uk/datacatalogue/studies/study?id=5151#!/access-data)</td></tr>
<tr><td><b>Measurement (background)*</b></td>	<td>Political Polarization in the UK (https://link.springer.com/article/10.1007/s10602-022-09368-8)</td></tr>
<tr><td><b>Scatter Plot</b></td>	<td>Relationship between selected variables by county (2D) </td></tr>
<tr><td><b>Bivariate Choropleth</b></td>	<td>Represents relationships across other counties based on selected variables in the scatter plot</td></tr>
<tr><td><b>Legend</b></td>	<td>Color legend for classification of data across all map types (uni and bivariate choropleths)</td></tr>
<tr><td><b>Overview</b></td>	<td>Robust documentation on polarization measurements, "how to use," and credits</td></tr> </table>

<table> <tr><th colspan="2">Interaction Section</th></tr>
<tr><td><b>Radio button</b></td>	<td>Overlay + space-alone. Turn on/off the election candidate layer for different years</td></tr>
<tr><td><b>County dropdown</b></td> <td>Filter + space-alone. Select a county for highlights across the whole dashboard.</td></tr>
<tr><td><b>Slider</b></td>	<td>Sequence + space-in-time. When clicked on the forward and backward buttons, the values are changed along with the symbolization</td></tr>
<tr><td><b>Menu</b></td>	<td>Filter + attributes-in-space. Attributes selection through nested dropdown (1D)</td></tr>
<tr><td><b>Print button*</b></td>	<td>Enabling + space, attributes-in-space. When clicked, export the current map view as PDF.</td></tr>
<tr><td><b>Hover</b></td>	<td>Retrieve + attributes-in-space, space. Dynamic popups are enabled with a highlighting enabled to show locations. And click supports identify (details on demand)</td></tr>
<tr><td><b>Histogram widget*</b></td>	<td>Resymbolize + attributes-in-space. Displays attributes-in-space within the selected range.</td></tr> </table>

<h3><b><ins>Lo-Fi wireframes</ins>:</b></h3>
SCANS ARE UPLOADED SOON !







