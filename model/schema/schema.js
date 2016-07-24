/**
 * Created by andrew.larsen on 2/13/2016.
 */
//schema.js
schemas = {
    offset : null,
    next_offset: null,
    number_of_total_results: null,
    was_cached:null,    
    results:[{
        id: null,
        cover_date: null, 
        description: null,
        image: null,
        issue_number: null,
        name: null,
        volume: null,
        image:{
            icon_url:null,
            medium_url:null,
            screen_url:null,
            small_url:null,
            super_url:null,
            thumb_url:null,
            tiny_url:null
        }
    }]
};

module.exports = schemas;
