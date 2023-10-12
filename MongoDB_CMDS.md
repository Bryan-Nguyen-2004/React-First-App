-- Insert a new user. On mongo shell, run at least one insert operation to create a new user to the users_list collection.

db.users_list.insert({"name":"Charlie", "job":"Janitor"})
db.users_list.insert({"name":"Johnny", "job":"Jailor"})
db.users_list.insert({"name":"John", "job":"Judge"})


-- Fetch all users. On mongo shell, fetch all users from the users_list collection.

db.users_list.find({})


-- Fetch users by name. On mongo shell, run a query to fetch users by a specific name.

db.users_list.find({ name: "John" })
db.users_list.find({ name: { $regex: /John/ } })


-- Fetch users by job. Similar to the previous one, but now including a specific job.

db.users_list.find({ job: "Janitor" })
db.users_list.find({ job: { $regex: /Ja/ } })


-- Fetch users by name and job. Similar to the previous one, but now including a name and a job at the same time.

db.users_list.find({name: { $regex: /John/ }, job: { $regex: /Ja/ } })


-- Fetch a user by id. Similar to the previous one, but now considering id only. Note that MongoDB assigns automatically the id field casted as ObjectId (Links to an external site.)

db.users_list.findOne({ _id: ObjectId("65273d9dd8a74f5e2584d168") })


-- Delete one user by id. On mongo shell, run a query to delete a user from the users_list collection. Again, use Update user.

db.users_list.deleteOne({ _id: ObjectId("65273d9dd8a74f5e2584d168") })


-- On mongo shell, run a query to make an update to an existing user in the users_list collection. You define what update you want to make as an exercise, as soon as it updates at least one field (name or job). Try also to update both fields (name and job). Use ID to uniquely identify a user. Hint: User the $set operator. (Links to an external site.)

db.users_list.updateOne({ _id: ObjectId("65273f52d8a74f5e2584d169") }, { $set: { name: "Jacks", job: "Juicer" } })


-- List all collections. Create another collection and insert something in the new collection. Then, list all collections in the current database.

show collections