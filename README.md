# 3D-Phone
-------
##About
>3D-Phone, otherwise known as zoomstack, is a proof-of-concept app in connecting the mobile deviceorientation event to pure CSS-3D (i.e., not using any external JavaScript 3d libraries, such as ThreeJS).

##Technology
The technologies used in this project include:
 * HTML, CSS, and JavaScript
 * The phone's deviceorientation event, which gives us three very nice and easy rotation variables to use.
 * Node.JS and Express for the backend server
 * Angular for the front end 
 * Socket.io to pipe the phone orientation data from the phone to the server, and then from the server to the laptop/desktop.

##Installation
Assuming you have all the requisite stuff installed (like Node.js)
 1. Fork the repo (so you can play with it too!)
 2. Clone the repo to your desktop. 
 3. Run '''npm install''' and then '''bower install''' to give the app all of the friends it wants.
 4. Next, make sure you have a phone. 
 5. Make sure both your _phone_ and _computer_ are connected to the same wireless network.
 6. Now, back to your computer. Run 'npm start'. Your server will start up, and you'll see an IP address at the bottom.
 7. Type that into your browser, followed by ':3000'. So if the IP is '192.168.0.1', you'd put '192.168.0.1:3000'. Press enter.
 8. Type the same address into your phone's browser.
 9. Click the start button _on your phone first_!
 10. Now click the start button on your computer!
 11. Type 'doctor' for a surprise!

##Credits:
This app was written for a personal hackathon at [Fullstack Academy of Code](fullstackacademy.com). The following people were on the dev team:
 * [David Newman](github.com/Newms34)
 * [Lynda Montgomery](github.com/montgol)
