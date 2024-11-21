/* ****************Commands of mongodbsh to complete the given task************************** */


/* ------------ 1. Remove middle element using pull ---------------------- */


db.users.updateOne(
	{
		_id: ObjectId('59b99db6cfa9a34dcd7885bb')
	},
	{ 
		$set:{
		 "genre": ["Rock"] 
		} 
	}
)


db.users.updateOne( 
	{ 
		_id: ObjectId('59b99db6cfa9a34dcd7885bb') 
	},
	{ 
		$push:{ 
			genre:{ 
				$each: ['Pop', 'Jazz'] 
			} 
		} 
	} 
)


db.users.findOne(
	{
		_id: ObjectId('59b99db6cfa9a34dcd7885bb')
	}
)


db.users.updateOne( 
	{ 
		_id: ObjectId('59b99db6cfa9a34dcd7885bb') 
	}, 
	{ $pull:{ 
		genre: 'Pop' 
		} 
	} 
)


/* ---------------- 2. Use all operators of update in mflix database ------------------------------ */


db.users.updateOne( 
	{ 
		_id: ObjectId('59b99db6cfa9a34dcd7885bb') 
	}, 
	{ 
		$unset:{ 
			testy: "" 
		} 
	} 
)

db.users.updateOne(
	{ 
		_id: ObjectId('59b99db6cfa9a34dcd7885bb') 
	},
	{ 
		$addToSet:{ 
			genre: 'Horror' 
		} 
	}
)

db.users.updateOne(
	{ 
		_id: ObjectId('59b99db6cfa9a34dcd7885bb') 
	},
	{ 
		$inc:{ 
			movies_watched: +1 
		} 
	}
)



db.users.updateOne(
	{ 
		_id: ObjectId('59b99db6cfa9a34dcd7885bb') 
	},
	{ 
		$rename:{ 
			"name": "username" 
		} 
	}
)



db.users.updateOne(
	{
		_id: ObjectId('59b99db6cfa9a34dcd7885bb')
	}, 
	{ 
		$set:{ 
			"genre": ["Rock"] 
		} 
	}
)



db.users.updateOne( 
	{ 
		_id: ObjectId('59b99db6cfa9a34dcd7885bb') 
	}, 
	{ 
		$push:{ 
			genre:{ 
				$each: ['Pop', 'Jazz'] 
			} 
		} 
	} 
);



db.users.updateOne( 
	{ 
		_id: ObjectId('59b99db6cfa9a34dcd7885bb') 
	}, 
	{ 
		$pull:{ 
			genre: 'Pop' 
		} 
	} 
)



db.collection.updateOne(
	{ 
		_id: ObjectId('59b99db6cfa9a34dcd7885bb') 
	},
	{ 
		$pop:{ 
			genre: 1 
		} 
	}
)


/* ---------------- 3. Limit sort and skip implementation in movies ------------------------ */

db.movies.find().sort(
	{ 
		year: 1 
	}
).skip(1).limit(3)

/* ---------------------- 4. Use anding and oring in one query ------------------------------------- */

db.movies.find(
	{
		$and:[
		{
			$or:[
			{
				rated: 'NOT RATED'
			},
			{
				year: 1893
			}]
		},
		{
			type: 'movie'
		}]
	}
).limit(3)

/* --------------------- 5. Use regex operator to make search of plot ------------------------------- */

db.movies.find(
	{
		plot:{
			$regex : "she"
		}
	}
).skip(0).limit(3)












