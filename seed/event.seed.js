const db = require('../config/database')
const Event = require('../models/Event')


let newEvents = [

  new Event({
    title: 'beach cleaning at Sur 1',
    description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    location: 'Sur',
    date: Date.now(),
    created_at: Date.now()
}),
new Event({
  title: 'beach cleaning at Sur 2',
  description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  location: 'Sur',
  date: Date.now(),
  created_at: Date.now()
}),
new Event({
  title: 'beach cleaning at Sur 3',
  description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  location: 'Sur',
  date: Date.now(),
  created_at: Date.now()
}),
  new Event({
    title: 'beach cleaning at Sur 4',
    description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    location: 'Sur',
    date: Date.now(),
    created_at: Date.now()
}),
new Event({
  title: 'beach cleaning at Sur 5',
  description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  location: 'Sur',
  date: Date.now(),
  created_at: Date.now()
}),
new Event({
  title: 'beach cleaning at Sur 6',
  description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  location: 'Sur',
  date: Date.now(),
  created_at: Date.now()
}),
  new Event({
    title: 'beach cleaning at Sur 7',
    description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
    location: 'Sur',
    date: Date.now(),
    created_at: Date.now()
}),
new Event({
  title: 'beach cleaning at Sur 8',
  description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  location: 'Sur',
  date: Date.now(),
  created_at: Date.now()
}),
new Event({
  title: 'beach cleaning at Sur 9',
  description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  location: 'Sur',
  date: Date.now(),
  created_at: Date.now()
})
    
]

newEvents.forEach( (event)=> {
    db.event.save( (err)=> {
        if (err) {
            console.log(err)
        }
    })
})