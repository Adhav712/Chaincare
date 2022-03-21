import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'dart:async';
import 'package:chaincare_frontend/welcome_page.dart';

class SplashScreenc extends StatefulWidget {
  const SplashScreenc({ key }) : super(key: key);

  @override
  _SplashScreencState createState() => _SplashScreencState();
}

class _SplashScreencState extends State<SplashScreenc> {
  @override
  void initState() {
    super.initState();
     Timer(const Duration(milliseconds: 5000), () { // set your desired delay time here
      Navigator.of(context).pushReplacement(
           MaterialPageRoute(builder: (context) => const WelcomePage()));
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body:  Container(
        alignment: Alignment.center,
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'ChainCare',
                style: GoogleFonts.mochiyPopOne(
                  textStyle:  const TextStyle(
                    fontSize: 50, 
                    color: Colors.blueAccent,
                    ),
                    ),
              ),
              Image.asset("assets/blockchain.png" , width: 200, height: 200,),
            ],
          ),
        ),
      ),
    );
  }
}