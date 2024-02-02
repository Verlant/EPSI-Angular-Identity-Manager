import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserLdap} from "../../models/user-ldap";
import {UsersService} from "../../service/users.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ConfirmValidParentMatcher, passwordMatchingValidator} from "./passwords-validator.directive";

export abstract class LdapDetailsComponent {

  passwordPlaceHolder: string;

  errorMessage = '';

  user?: UserLdap;
  processLoadRunning = false;
  processValidateRunning = false;

  get passwordForm() {
    return this.userForm.get('passwordGroup');
  }
  protected constructor(
              public addForm: boolean,
              private fb: FormBuilder,
              private router: Router
  ) {
    this.passwordPlaceHolder = 'Mot de passe' + (this.addForm ? '' : ' vide si inchangé');
    if (this.addForm) {
      this.passwordForm?.get('password')?.addValidators(Validators.required);
      this.passwordForm?.get('confirmPassword')?.addValidators(Validators.required);
    }
  }

  protected onInit() {

  }

  // ngOnInit(): void {
  //   this.getUser();
  // }

  userForm = this.fb.group( {
    login: [''],
    nom: [''],
    prenom: [''],
    passwordGroup: this.fb.group( {
      password: [''],
      confirmPassword: ['']
    }, { validators: passwordMatchingValidator }),
    mail: {value: '', disabled: true},
  });

  goToLdap() {
    this.router.navigate(['/users/list']).then((e) => {
      if (!e) {
        console.error('Navigation has failed !');
      }
    });
  }

  onSubmitForm() {
    this.validateForm();
  }

  updateLogin() {
    const control = this.userForm.get('login');
    if (control === null) {
      console.error("L'objet 'login' du formulaire n'existe pas !");
      return;
    }
    control.setValue((this.formGetValue('prenom') + '.' +
      this.formGetValue('nom')).toLowerCase());
    this.updateMail();
  }

  updateMail() {
    const control = this.userForm.get('mail');
    if (control === null) {
      console.error("L'objet 'mail' du formulaire n'existe pas !");
      return;
    }
    control.setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan');
  }

  isFormValid() {
    return this.userForm.valid && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm(): void

  private formGetValue(name: string) : string {
    const control = this.userForm.get(name);
    if (control === null) {
      console.error("L'objet " + name + " du formulaire n'existe pas !");
      return "";
    }
    return control.value;
  }

  private formSetValue(name: string, value: string | number) : void {
    const control = this.userForm.get(name);
    if (control === null) {
      console.error("L'objet " + name + " du formulaire n'existe pas !");
      return;
    }
    control.setValue(value);
  }

  // Permet d'afficher les propriétés de UserLdap dans le formulaire
  protected copyUserToFormControl() {
    if (this.user === undefined) {
      return;
    }

    this.formSetValue('login', this.user.login);
    this.formSetValue('nom', this.user.nom);
    this.formSetValue('prenom', this.user.prenom);
    this.formSetValue('mail', this.user.mail);
  /* Il faudra ajouter les champs suivants au formulaire
    this.formSetValue('employeNumero', this.user.employeNumero);
    this.formSetValue('employeNiveau', this.user.employeNiveau);
    this.formSetValue('dateEmbauche', this.user.dateEmbauche);
    this.formSetValue('publisherId', this.user.publisherId);
    this.formSetValue('active', this.user.active);
   */
  }

  // Permet de récupérer les valeurs du formulaire et de retourner un objet UserLdap avec ces valeurs
  protected getUserFromFormControl(): UserLdap  {
    return {
      id: this.user===undefined ? undefined : this.user.id,
      login : this.formGetValue('login'),
      nom: this.formGetValue('nom'),
      prenom: this.formGetValue('prenom'),
      nomComplet: this.formGetValue('nom') + ' ' + this.formGetValue('prenom'),
      mail: this.formGetValue('mail'),
      // Les valeurs suivantes devraient être reprises du formulaire
      employeNumero: 1, // this.formGetValue('employeNumero'),
      employeNiveau: 1, // this.formGetValue('employeNiveau'),
      dateEmbauche: '2020-04-24', // this.formGetValue('dateEmbauche'),
      publishedId: 1, // this.formGetValue('publisherId'),
      active: true,
      motDePasse: '',
      role: 'ROLE_USER'
    };
  }

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  getErrorMessage() {
    if (this.passwordForm?.errors) {
      return 'Les mots de passe ne correspondent pas';
    }
    return 'Entrez un mot de passe';
  }

}
