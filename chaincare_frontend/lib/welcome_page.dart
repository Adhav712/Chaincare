import 'package:flutter/material.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          
             ElevatedButton(
              
              autofocus: true,
              onPressed: () => Navigator.pushNamed(context, '/patient-login'),
              child: const Text("Patient Login"),
            ),
          
          
          ElevatedButton(
            onPressed: () => Navigator.pushNamed(context, '/doctor-login'),
            child: const Text("Doctor Login"),
          ),
          // ElevatedButton(
          //   onPressed: () => Navigator.pushNamed(context, '/insurance-login'),
          //   child: const Text("Insurance Login"),
          // ),
          // ElevatedButton(
          //   onPressed: () => Navigator.pushNamed(context, '/admin-login'),
          //   child: const Text("Admin Login"),
          // ),
        ],
      ),
      body: const Center(child: Text("Welcome to chaincare")),
    );
  }
}
