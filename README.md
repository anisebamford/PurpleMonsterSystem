## Purple Monster Server

Purple monster server is a next generation headless property management system, primarily aimed at the hospitality industry. Maybe it's good for other stuff. I don't know yet. It's pretty cool.

### Features: 
* Changes are permanently recorded. The structure of the database ensures that any changes made to anything are permanently visible to authorized users. In fact, these changes are our "source of truth"; the data model for your property is built at start up by processing all the changes to your property.
* Groups are in. 
    * We prefer groups to rates. Our group focused approach to property management systems simplifies management of your property. Do you have a special rate for locals? Create a local group, then put that rate on your group. Now you know why a guest got the rate they did!
    * Set limited groups. Groups can be limited to certain date ranges. We also want to add an api to restrict groups by other qualifications using scripting. We just haven't yet. 
* Apps out the wazoo!
    * The front desk app gives easy access to all the sorts of things a front desk agent needs at their fingertips.
    * The housekeeping app allows housekeepers to stay up to date on the status of room. Set zones! The housekeepers assigned to those zones will be notified when one of their rooms has a status update!
    * The maintenance app will show the maintenance staff everything they need to do their jobs quickly and easily.
    * Other apps will come. I'm just one person. (tbd, add a link to buy me a coffee)
* Role based chatting! Now you and your staff can send messages to people based on whether their roles! Neat!
* Other stuff! I have lots of ideas and limited attention.
* Friendship and Free Stuff: We're MIT Licensed, baybee! If you have built something on or for this project, and it's got a permissive open source licence, we'd love to feature it here!

### Development:
* Copy the .env.dev file to .env: `cp ./.env.dev ./.env`
* Start the containers: `docker-compose up -d`