var constants = {
	COMIC_API_RESPONSE : 
		{
			OK:1,
			Invalid: 100,
			Not_Found : 101,
			Format_Error : 102,
			json_callback : 103,
			Filter_Error : 104
			 
		},
	REDIS_CACHE_RESPONSE : 
		{
			OK:200,
			CREATED: 201 
		}

}

module.exports=constants