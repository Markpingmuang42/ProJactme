import 'dart:async';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';


void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  final appTitle = 'DoofreeTV';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: appTitle,
      home: Home(title: appTitle),
    );
  }
}

//Home
class Home extends StatelessWidget {
  final String title;

  Home({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title),backgroundColor: Colors.blue[500],),
      body: Container(
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage("images/02.jpg"),
            fit: BoxFit.cover,
          ),
        ),
        ),
      drawer: Drawer(

        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              child: Text('Menu',style: TextStyle(fontSize: 30,color: Colors.white,),),
              decoration: BoxDecoration(
                color: Colors.blue[500],
                // shape: BoxShape.circle,
                image: DecorationImage(
                image: AssetImage("images/04.jpg"),
                fit: BoxFit.fill,
              ),
              ),     
            ),
            ListTile(
              title: Row(children: [
                  Icon(Icons.account_circle),
                  Text(' Proflie',style: TextStyle(fontSize: 20),),              
                ]),
              onTap: () {
                  Navigator.push(context,MaterialPageRoute(
                    builder: (context) => Profile()
                    ));
              },
            ),
            ListTile(
              title: Row(children: [
                  Icon(Icons.theaters),
                  Text(' Movie List',style: TextStyle(fontSize: 20),),              
                ]),
              onTap: () {
                  Navigator.push(context,MaterialPageRoute(
                    builder: (context) => Movie()
                    ));
              },
            ),
            ListTile(
              title: Row(children: [
                  Icon(Icons.article),
                  Text(' Reviews',style: TextStyle(fontSize: 20),),              
                ]),
              onTap: () {
                  Navigator.push(context,MaterialPageRoute(
                    builder: (context) => Reviews()
                    ));
              },
            ),
            ListTile(
              title: Row(children: [
                  Icon(Icons.movie),
                  Text(' Trailers Movie',style: TextStyle(fontSize: 20),),              
                ]),
              onTap: () {
                  Navigator.push(context,MaterialPageRoute(
                    builder: (context) => Video()
                    ));
              },
            ),
          ],
        ),
      ),
    );
  }
}


//Items 1-Profile
class Profile extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var title = 'Proflie';
    return Scaffold(
        appBar: AppBar(
          title: Text(title),
          backgroundColor: Colors.blue[500],
        ),
        body: Padding(
            padding: EdgeInsets.all(80),
            child: Column(children: [
              Text("Name : Mr. PantaKan Pingmuang"),
              Text("StudentID  : 61020694"),
          ])
        )
      );
  }
}


//Items 2-Movie
class Movie extends StatelessWidget {
  List<String> images = [
    'images/Joker.jpg',
    'images/1917.jpg',
    'images/tenet.jpg',
    'images/incep.jpg',
    'images/memento.jpg',
    'images/DK.jpg',
    'images/inter.jpg',
    'images/Prestige.jpg',
  ];
  @override
  Widget build(BuildContext context) {
    var title = 'Movie List';
    return Scaffold(
        appBar: AppBar(
          title: Text(title),
          backgroundColor: Colors.blue[500],
        ),
        body: GridView(
        physics:
            BouncingScrollPhysics(),
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2),
        children: images.map((url) {
          return Card(child: Image.asset(url));
        }).toList(),
      ),
      );
  }
}


//Items 3-Reviews
class Reviews extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Color color = Theme.of(context).primaryColor;
    Widget buttonSection = Container(
      child: Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        _buildButtonColumn(Colors.blue[500], Icons.comment, 'comment'),
        _buildButtonColumn(Colors.blue[500], Icons.slideshow, 'View'),
        _buildButtonColumn(Colors.blue[500], Icons.share, 'SHARE'),
      ],
      ),
    );
    var title ='Reviews';
    return Scaffold(
      appBar: AppBar(
          title: Text(title),
          backgroundColor: Colors.blue[500],
        ),
        body: ListView(
          children: [
            Image.asset(
              'images/tenet.jpg',
              width: 100,
              height: 300,
            ),
            titleSection,
            buttonSection,
            textSection,
          ],
        )
    );
  
}

  Column _buildButtonColumn(Color color, IconData icon, String label) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(icon, color: color),
        Container(
          margin: const EdgeInsets.only(top: 8),
          child: Text(
            label,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w400,
              color: color,
            ),
          ),
        ),
      ],
    );
  }

}

Widget titleSection = Container(
  padding: const EdgeInsets.all(32),
  child: Row(
    children: [
      Expanded(
        /*1*/
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            /*2*/
            Container(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(
                'TENET',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 17,
                ),
              ),
            ),
            Text(
              'Christopher Nolan',
              style: TextStyle(
                color: Colors.grey[500],
              ),
            ),
          ],
        ),
      ),
      /*3*/
      Icon(
        Icons.star,
        color: Colors.blue[500],
      ),
      Text('100 stars'),
    ],
  ),
);
Widget textSection = Container(
  padding: const EdgeInsets.all(32),
  child: Text(
    'ทางด้านเนื้อเรื่องก็ต้องบอกว่า เรื่องราวของ TENET  ด้วยความเป็นลูกผสมของหนังสายลับและไซไฟ ในส่วนพาร์ทสายลับต้องบอกว่ามันก็คือหนังสายลับที่มีเรื่องราวไม่ได้ต่างจากเดิมเสียเท่าไหร่ แต่โนแลนใช้รูปแบบการนำเสนอในแบบเฉพาะของตัวเอง และ ความไซไฟอิงวิทยาศาสตร์มาสร้างความแตกต่างให้กับในส่วนนี้ ซึ่งก็ด้วยความไซไฟ-วิทยาศาสตร์นี่แหละ เลยอาจจะมีบางช่วง ทำเอาคนดูงงไปเสียบ้าง เพราะหนังจะพ่นคำศัพท์วิทยาศาสตร์ที่ชวนเข้าใจยากสักหน่อยออกมาเป็นระยะๆ',
    softWrap: true,
  ),
);


//Items 4-video
class Video extends StatefulWidget {
  Video({Key key}) : super(key: key);
  @override
  _VideoPlayerScreenState createState() => _VideoPlayerScreenState();
}

class _VideoPlayerScreenState extends State<Video> {
  VideoPlayerController _controller;
  Future<void> _initializeVideoPlayerFuture;

  @override
  void initState() {
    _controller = VideoPlayerController.asset('images/Tenet02.mp4');
    _initializeVideoPlayerFuture = _controller.initialize();
    _controller.setLooping(true);

    super.initState();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('TENET-Trailers'),
        backgroundColor: Colors.blue[500],
      ),
      body: FutureBuilder(
        future: _initializeVideoPlayerFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.done) {
            return AspectRatio(
              aspectRatio: _controller.value.aspectRatio,
              child: VideoPlayer(_controller),
            );
          } else {
            return Center(child: CircularProgressIndicator());
          }
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          setState(() {
            if (_controller.value.isPlaying) {
              _controller.pause();
            } else {
              _controller.play();
            }
          });
        },
        child: Icon(
          _controller.value.isPlaying ? Icons.pause : Icons.play_arrow,
        ),
      ),
    );
  }
}

