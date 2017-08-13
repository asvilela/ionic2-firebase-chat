import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user/user.service';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: Boolean = false;
  uploadProgress: number;
  private filePhoto: File;

  constructor(
    public authService: AuthService,
    public cd: ChangeDetectorRef,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public userService: UserService
  ) {
  }

  ionViewCanEnter(): Promise<Boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    // this.editUser();
    if(this.onPhoto) {
      
      let uploadTask = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);

      uploadTask.on('state_changed', (snapshot) => {

        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        this.cd.detectChanges();

      }, (error: Error) => {
        //catch error
      }, () => {
        this.editUser(uploadTask.snapshot.downloadURL);
      });

    }
    else {
      this.editUser();
    }
  }

  onPhoto(event): void {
    this.filePhoto = event.target.files[0];
  }

  private editUser(photoUrl?: string): void {
    this.userService
      .edit({
        name: this.currentUser.name,
        username: this.currentUser.username,
        photo: photoUrl || this.currentUser.photo || ''
      }).then(() => {
        this.canEdit = false;
        this.filePhoto = undefined;
        this.uploadProgress = 0;
        this.cd.detectChanges();
      });
  }

}
