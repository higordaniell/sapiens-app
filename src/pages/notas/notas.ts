import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { NotasDetalhesPage } from '../notas-detalhes/notas-detalhes';

import { Notas } from '../../providers/notas';

@Component({
  selector: 'page-notas',
  templateUrl: 'notas.html'
})
export class NotasPage {

  private notas: any;

  constructor(public navCtrl: NavController, private notasProvider: Notas, private alertCtrl: AlertController) {
    this.notas = this.notasProvider.getNotas();
  }

  doRefresh(refresher) {
    this.notasProvider.online().then(
      sucess => {
        refresher.complete();
      },
      err => {
        refresher.cancel();
        this.alertCtrl.create({
          title: 'Falha ao carregar',
          subTitle: err,
          buttons: ['Fechar']
        }).present();
      }
    )
  }

  disciplina(d) {
    this.navCtrl.push(NotasDetalhesPage, {disciplina: d});
  }
}
