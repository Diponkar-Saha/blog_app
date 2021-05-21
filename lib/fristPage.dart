import 'package:blog_app/login.dart';
import 'package:blog_app/signUpPage.dart';
import 'package:flutter/material.dart';

import 'package:flutter/material.dart';
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Container(
          width: double.infinity,
          height: MediaQuery.of(context).size.height,
          padding: EdgeInsets.symmetric(horizontal: 30, vertical: 50),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Column(
               // crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Text("Well come",style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 30
                  ),
                  ),
                  SizedBox(height: 20,),
                  Text("Automatic identity verification which enables you to verify your identity",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: Colors.grey[700],
                        fontSize: 15
                    ),
                  ),
               ],
              ),
              Container(
                height: MediaQuery.of(context).size.height/3,
                decoration: BoxDecoration(
                    image: DecorationImage(
                        image: AssetImage('assets/illustration.png')
                    )
                )
              ),
              Column(
                children: [
                  MaterialButton(
                    minWidth: double.infinity,
                    height: 60,
                    onPressed: (){
                      Navigator.push(context, MaterialPageRoute(builder: (context) => Login()));
                    },
                    shape: RoundedRectangleBorder(
                      side: BorderSide(
                        color: Colors.black
                      ),
                      borderRadius: BorderRadius.circular(50)
                    ),
                    child: Text("Login",style: TextStyle(
                      fontWeight: FontWeight.w600,fontSize: 18
                    ),),
                  ),
                  SizedBox(height: 20,),
                  Container(
                    decoration: BoxDecoration(

                      borderRadius: BorderRadius.circular(50),
                      border: Border(
                        bottom: BorderSide(color: Colors.black),
                        top: BorderSide(color: Colors.black),
                        left: BorderSide(color: Colors.black),
                        right: BorderSide(color: Colors.black),
                      ),

                    ),
                    child:  MaterialButton(
                      minWidth: double.infinity,
                      height: 60,
                      onPressed: (){
                        Navigator.push(context, MaterialPageRoute(builder: (context) => SignUpPage()));
                      },
                      color: Colors.amber,
                      elevation: 0,
                      shape: RoundedRectangleBorder(
                          side: BorderSide(
                              color: Colors.black
                          ),
                          borderRadius: BorderRadius.circular(50)
                      ),
                      child: Text("Sign up",style: TextStyle(
                          fontWeight: FontWeight.w600,fontSize: 18
                      ),),
                    ),
                  )

                ],
              )
            ],
          ),

        ),
      ),

    );
  }
}
