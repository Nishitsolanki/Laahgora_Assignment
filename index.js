const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
require('dotenv').config();
const cron = require('node-cron');
const Video = require('./models/video');

const app = express();
// const PORT = process.env.PORT || 3002;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// const uploadQueue = [];

app.post('/upload', upload.array('videos', 5), async (req, res) => {
  try {
    const files = req.files;
  

    if (!files) {
      return res.status(400).send('Please provide both files and format.');
    }

    const uploadedVideos = []; 

    for (const file of files) {
      const newVideo = new Video({
        filename: file.filename,
        path: file.path,
        status: 'pending', 
      });
      await newVideo.save(); 
      uploadQueue.push(newVideo);


      uploadedVideos.push(newVideo); 
    }

    await processQueue(); 

    return res.status(201).json({ uploaded: uploadedVideos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


const processQueue = async () => {
  while (uploadQueue.length > 0) {
    const video = uploadQueue.shift(); 
    try {
    
      video.status = 'processing';
      await video.save();

      console.log(`Video ${video.filename} started.`);
    
      await simulateUploadProcessing(video);

      video.status = 'completed';
      await video.save();
      console.log(`Video ${video.filename} completed.`);
    } catch (error) {
      console.error('Error processing video:', error);
      
      video.status = 'failed';
      await video.save(); 
    }
  }
};


const simulateUploadProcessing = async (video) => {
  
  await new Promise(resolve => setTimeout(resolve, 5000));
  
};


cron.schedule('* * * * *', processQueue);

cron.schedule('*/2 * * * *', () => {
    console.log('This message will be displayed two minute.');
  });


const uploadQueue = [];


const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 