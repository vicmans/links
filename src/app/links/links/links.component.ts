import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService, User } from 'src/app/auth/auth.service';
import { Link } from '../link.model';
import { LinksService } from '../links.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class LinksComponent implements OnInit, OnDestroy {
  links: Link[] = [];

  form: FormGroup
  user: any = null

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(
    private linksService: LinksService,
    private formBuilder: FormBuilder,
    private confirm: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: [''],
      url: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getLinks()
    this.authService.getUser().pipe(takeUntil(this.destroyed$)).subscribe(user => {
      this.user = user
    })
    this.authService.getUserApi(1).toPromise()
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  getLinks() {
    this.linksService.get().subscribe(resp => {
      this.links = resp
    })
  }

  add(){
    this.linksService.create(this.form.value).pipe(takeUntil(this.destroyed$))
    .subscribe(resp => {
      this.form.reset()
      this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record saved'});
    })
  }

  destroy(id: any) {
    this.confirm.confirm({
      header: 'Delete Confirmation',
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
          //Actual logic to perform a confirmation
          this.linksService.delete(id)
          .pipe(takeUntil(this.destroyed$))
          .subscribe(resp => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
            this.getLinks()
          }, error => {
            this.messageService.add({severity:'danger', summary:'Error', detail:'Something went wrong'});
          })
      }
  });
  }

}
