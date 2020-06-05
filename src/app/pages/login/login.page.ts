import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { UserLogin } from "src/app/interfaces/user.login.interface";
import { LoginService } from "../../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  constructor(
    private alertController: AlertController,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.presentAlertPrompt();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: "my-custom-class",
      header: "Login!",
      inputs: [
        {
          name: "email",
          type: "email",
          placeholder: "Add your email",
        },
        {
          name: "password",
          type: "password",
          placeholder: "Add your password",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Ok",
          handler: (data) => {
            let UserLogin = { username: data.email, password: data.password };
            this.login(UserLogin);
            console.log("Confirm Ok");
          },
        },
      ],
    });
    await alert.present();
  }

  login(user: UserLogin): void {
    this.loginService
      .authenticate(user)
      .then((resp: any) => {
        this.loginService.setLocalStorage(resp);
        this.router.navigate(["/exam/1"]);
      })
      .catch((err) => {
        console.log("Err", err)
        // this.loginService.logout();
        // this.router.url.replace("/", "") === "register"
        //   ? this.router.navigate(["/register"])
        //   : this.router.navigate(["/login"]);
      });
  }
}