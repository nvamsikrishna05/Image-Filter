# Udagram Image Filtering Microservice

A REST API which takes an image as input and returns the resized and grayscaled image as output

API EndPoint : {url}//filteredimage?image_url={{URL}}

### Running the Project Locally
Clone the Project locally and run the following command to install the dependencies. <br>
<code>npm install</code>

Run the Project Development server locally by using the following command : <br>
<code>npm run dev</code>

To create a production build use the following command which compiles the typescript code into Javasript and zips it into an Archive file which can be directly used to deploy to AWS ElasticBeanStalk <br>
<code>npm run build</code>
