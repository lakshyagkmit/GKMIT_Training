/* -------------- match --------------- */

db.movies.aggregate([
	{
		$match: {
			"imdb.rating": {
				$gt: 5
			}
		}
	}
])


/* -------------- addFields, avg --------------- */

db.movies.aggregate([
	{
		$match: {
			"imdb.rating": {
				$gt: 5
			}
		}
	},{
		$addFields: {
			avg_ratings: {
				$avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
			}
		}
	}
])


/* -------------- count --------------- */

db.movies.aggregate([
	{
		$match: {
			"imdb.rating": {
				$gt: 5
			}
		}
	},{
		$addFields: {
			avg_ratings: {
				$avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
			}
		}
	}, {
		$match: {
			"year": {
				$gte: 1910
			}
		}
	}, {
		$count: "title"
	}
])



/* -------------- unwind --------------- */

db.movies.aggregate([
	{
		$match: {
			"imdb.rating": {
				$gt: 5
			}
		}
	},{
		$addFields: {
			avg_ratings: {
				$avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
			}
		}
	}, {
		$match: {
			"year": {
				$gte: 1910
			}
		}
	}, {
		$unwind: {
			path: "$genres"
		}
	}
])



/* -------------- project --------------- */

db.movies.aggregate([
	{
		$match: {
			"imdb.rating": {
				$gt: 5
			}
		}
	},{
		$addFields: {
			avg_ratings: {
				$avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
			}
		}
	}, {
		$match: {
			"year": {
				$gte: 1910
			}
		}
	}, {
		$unwind: {
			path: "$genres"
		}
	}, {
		$project: {
			rated: 1
		}
	}
])



/* -------------- group --------------- */

db.movies.aggregate([
	{
		$match: {
			"imdb.rating": {
				$gt: 5
			}
		}
	},{
		$addFields: {
			avg_ratings: {
				$avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
			}
		}
	}, {
		$match: {
			"year": {
				$gte: 1910
			}
		}
	}, {
		$group: {
			_id: "$year", 
			title: {
				$push: "$title"
			}, 
			count: {
				$sum: 1
			}
		}
	}
])



/* -------------- lookup --------------- */

db.movies.aggregate([
	{
		$match: {
			"imdb.rating": {
				$gt: 5
			}
		}
	},{
		$addFields: {
			avg_ratings: {
				$avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
			}
		}
	}, {
		$match: {
			"year": {
				$gte: 1910
			}
		}
	}, {
		$lookup: {
			from: "comments", 
			foreignField: "movies_id", 
			localField: "_id", 
			as: "comments"
		}
	}
])



/* -------------- facet --------------- */

db.movies.aggregate([
	{
		$match: {
			"imdb.rating": {
				$gt: 5
			}
		}
	},{
		$addFields: {
			avg_ratings: {
				$avg: ["$imdb.rating", "$tomatoes.viewer.rating"]
			}
		}
	}, {
		$match: {
			"year": {
				$gte: 1910
			}
		}
	}, {
		$facet: {
			"data": [{
				$skip: 10
			},{
				$limit: 10
			}],
			"count": [{
				$count: "title"
			}]
	}
}
])

