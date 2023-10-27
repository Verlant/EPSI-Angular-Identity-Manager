import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { Location } from '@angular/common';
import {UserLdap} from "../models/user-ldap";
import {UsersService} from "../service/users.service";
import {FormBuilder} from "@angular/forms";

export abstract class LdapDetailsComponent {
  user: UserLdap | undefined;
  processLoadRunning : boolean = false;
  processValidateRunning : boolean = false;
  // Le PlaceHolder pour les mots de passes en fonction de l'édition ou non
  passwordPlaceHolder: string;
  userForm = this.fb.group({
    login: [''], // Valeur de départ vide
    nom: [''],
    prenom: [''],
    // Groupe de données imbriqué
    passwordGroup: this.fb.group({
      password: [''],
        confirmPassword: ['']
    }),
      mail: {value: '', disabled: true},
  });
  constructor(
    public addForm: boolean,
    /* A VOIR protected route: ActivatedRoute, */
    private fb : FormBuilder,
    private router : Router)
  {
    this.passwordPlaceHolder = "Mot de passe" + (this.addForm ? '' : ' (vide si inchangé)');
  }

  protected onInit(): void {
    // Permet d'initialiser le formulaire au cas où
    // Nous n'en avons pas besoin ici
  }

/*
  private getUser(): void {
    const login = this.route.snapshot.paramMap.get('id');

    if (login === null) {
      console.log("getUser = " + login);
      return;
    }

    this.usersService.getUser(login).subscribe(
      user => {
        this.user = user;
        console.log('LdapDetails getUser = ' + user);
      }
    )
  }
*/

  goToLdap() {
    this.router.navigate(['/users/list']).then((e) => {
      if (!e) {
        console.error('Navigation has failed !');
      }
    })
  }

  onSubmitForm() {
    this.validateForm();
  }
  updateLogin() : void {
      const control = this.userForm.get('login');
      if (control === null) {
          console.error("L'objet 'login' du formulaire n'existe pas");
          return;
      }
      control.setValue((this.formGetValue('prenom') + '.' +
          this.formGetValue('nom')).toLowerCase());
      this.updateMail();
  }
  updateMail() : void {
    const control = this.userForm.get('mail');
      if (control === null) {
          console.error("L'objet 'mail' du formulaire n'existe pas");
          return;
      }
      control.setValue(this.formGetValue('login').toLowerCase() + '@epsi.lan')
  }
  isFormValid() : boolean {
    return this.userForm.valid
      // Exemple de validation d'un champ :
      && (!this.addForm || this.formGetValue('passwordGroup.password') !== '');
  }

  abstract validateForm(): void

  private formGetValue(name: string): any {
    const control = this.userForm.get(name);
    if (control === null) {
        console.error("L'objet '" + name + "' du formulaire n'existe pas");
        return "";
    }
    return control.value;
  }

  private formSetValue(name: string, value: string | number): any {
    const control = this.userForm.get(name);
    if (control === null) {
      console.error("L'objet '" + name + "' du formulaire n'existe pas");
      return "";
    }
    control.setValue(value);
  }

  // Permet d'afficher les proprétés de UserLdap dans le formulaire
  protected copyUserToFormControl(): void {
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

  // Permet de récupérer les valeurs du formulaire et
  // de retourner un objet UserLdap avec ces valeurs
  protected getUserFromFormControl(): UserLdap {
    return {
      login: this.formGetValue('login'),
      nom: this.formGetValue('nom'),
      prenom: this.formGetValue('prenom'),
      nomComplet: this.formGetValue('nom') + ' ' + this.formGetValue('prenom'),
      mail: this.formGetValue('mail'),
      // Les valeurs suivantes devraient être reprise du formulaire
      employeNumero: 1,
      employeNiveau: 1,
      dateEmbauche: '2020-04-24',
      publisherId: 1,
      active: true,
      motDePasse: '',
      role: 'ROLE_USER',
    }
  }
}
