let db = {
  users: [
    {
      userId: "NGj05yGow5gjevpj0X25dB8nARo1",
      email: "user@email.com",
      handle: "user",
      createdAt: "2019-12-17T12:20:38.069Z",
      imageUrl: "image/37507528939.jpg",
      bio: "Hello, my name is user, nice to meet you",
      website: "https://user.com",
      location: "London, UK"
    }
  ],
  screams: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2019-12-17T12:20:38.069Z",
      likeCount: 5, 
      commentCount: 2,
      userImage: "image/37507528939.jpg"
    }
  ],
  comments: [
    {
      userHandle: "user",
      screamId: "kdfalksjdlkfjalksjdlfkasdfa",
      body: "nice one mate",
      createdAt: "2019-12-17T12:20:38.069Z"
    }
  ],
  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      screamId: "fKIiaD80Hemeusgqz9j6",
      type: "like | comment",
      createdAt: "2019-12-17T12:20:38.069Z"
    }
  ]
}

const userDetails = {
  // Redux data
  credentials: {
    userId: "NGj05yGow5gjevpj0X25dB8nARo1",
    email: "user@email.com",
    handle: "user",
    createdAt: "2019-12-17T12:20:38.069Z",
    imageUrl: "image/37507528939.jpg",
    bio: "Hello, my name is user, nice to meet you",
    website: "https://user.com",
    location: "London, UK"
  },
  likes: [
    {
      userHandle: "user",
      screamId: "hh705owFwlkajlksjdflw"
    },
    {
      userHandle: "user",
      screamId: "asd2djlkj2kjlkdjflkja"
    }
  ]
}
