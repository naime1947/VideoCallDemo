import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;


@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit, AfterViewInit {

  domain: string = "meet.jit.si";
  room: any;
  options: any;
  api: any;
  user: any;

  // For Custom Controls
  isAudioMuted = false;
  isVideoMuted = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
      this.room = 'naime-test-meeting'; // set your room name
      this.user = {
          name: 'Naime Ahmed' // set your username
      }
  }

  ngAfterViewInit(): void {
      this.options = {
          roomName: this.room,
          width: 900,
          height: 500,
          configOverwrite: { prejoinPageEnabled: false },
          interfaceConfigOverwrite: {
              // overwrite interface properties
          },
          parentNode: document.querySelector('#jitsi-iframe'),
          userInfo: {
              displayName: this.user.name
          }
      }

      this.api = new JitsiMeetExternalAPI(this.domain, this.options);

      this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
      });
  }


  handleClose = () => {
      console.log("handleClose");
  }

  handleParticipantLeft = async (participant:any) => {
      console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
      const data = await this.getParticipants();
  }

  handleParticipantJoined = async (participant:any) => {
      console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Naime Ahmed", formattedDisplayName: "Naime Ahmed" }
      const data = await this.getParticipants();
  }

  handleVideoConferenceJoined = async (participant:any) => {
      console.log("handleVideoConferenceJoined", participant); // { roomName: "naime-test-meeting", id: "8c35a951", displayName: "Naime Ahmed", formattedDisplayName: "Naime Ahmed (me)"}
      const data = await this.getParticipants();
  }

  handleVideoConferenceLeft = () => {
      console.log("handleVideoConferenceLeft");
      this.router.navigate(['/']);
  }

  handleMuteStatus = (audio:any) => {
      console.log("handleMuteStatus", audio); // { muted: true }
  }

  handleVideoStatus = (video:any) => {
      console.log("handleVideoStatus", video); // { muted: true }
  }

  getParticipants() {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve(this.api.getParticipantsInfo()); // get all participants
          }, 500)
      });
  }

  // custom events
  executeCommand(command: string) {
      this.api.executeCommand(command);;
      if(command == 'hangup') {
          this.router.navigate(['/']);
          return;
      }

      if(command == 'toggleAudio') {
          this.isAudioMuted = !this.isAudioMuted;
      }

      if(command == 'toggleVideo') {
          this.isVideoMuted = !this.isVideoMuted;
      }
  }

}
