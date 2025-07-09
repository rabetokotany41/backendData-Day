import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class RegisterPage extends StatelessWidget {
  final nomController = TextEditingController();
  final emailController = TextEditingController();
  final passController = TextEditingController();
  final localisationController = TextEditingController();

  Future<void> registerUser() async {
    var url = Uri.parse('http://localhost:5000/api/auth/register');
    var response = await http.post(url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'nom': nomController.text,
        'email': emailController.text,
        'mot_de_passe': passController.text,
        'localisation': localisationController.text,
      }),
    );

    var data = jsonDecode(response.body);
    print(data);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Inscription")),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(children: [
          TextField(controller: nomController, decoration: InputDecoration(labelText: 'Nom')),
          TextField(controller: emailController, decoration: InputDecoration(labelText: 'Email')),
          TextField(controller: passController, decoration: InputDecoration(labelText: 'Mot de passe'), obscureText: true),
          TextField(controller: localisationController, decoration: InputDecoration(labelText: 'Localisation')),
          ElevatedButton(onPressed: registerUser, child: Text("S'inscrire")),
        ]),
      ),
    );
  }
}
