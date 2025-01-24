
import { Component, model, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { DialogModule } from 'primeng/dialog';
import { PrimeNG } from 'primeng/config';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { VillesService } from '../shared/services/Villes.service';
import { CloneProductService } from '../shared/services/CloneProduct.service';
import { CommandeService } from '../shared/services/Commande.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { UtilisService } from '../shared/services/Utilis.service';
import { SelectModule } from 'primeng/select';
import { FloatLabel } from 'primeng/floatlabel';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import * as CryptoJS from 'crypto-js';
import { Meta, Title } from '@angular/platform-browser';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TagModule } from 'primeng/tag';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-accueil',
  imports:[
  
      ButtonModule,
      DrawerModule,
      BadgeModule,
      DialogModule,
      GalleriaModule,
      TagModule,
      OverlayBadgeModule,
      ImageModule,
      ScrollPanelModule,
      DividerModule,
      InputTextModule,
      AutoCompleteModule,
      ReactiveFormsModule,
      FormsModule,
      ToastModule,
      SelectModule,
      FloatLabel,
      InputGroupModule,
      InputGroupAddonModule
    ],
    providers: [MessageService],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent implements OnInit {
  title = 'daymond_client';
  visible: boolean = false;
  itemForm!: FormGroup;
  data:any
  villes:any=[]
  produit:any
  selectedVille:any
  couleurs:any=['Jaune']
  tailles:any=['12 Pouces']
  selectedCouleur:any
  selectedTaille:any
  cpt:any=0
  loading:boolean=false
  total:any
  leNom:any
  contact:any
  qte:any=1
  dataUrl:any
  idSeller:any
text: any;

  constructor(
    private primeng: PrimeNG,
    private fb: FormBuilder,
    private villesService : VillesService,
    private cloneProductService : CloneProductService,
    private commandeService : CommandeService,
    private messageService: MessageService,
    private utilisService : UtilisService,
    private route: ActivatedRoute,
    private router : Router,
    private meta: Meta,
    private letitre: Title
  ) {}

    ngOnInit() {
      this.route.queryParamMap.subscribe(params => {
        const data = params.get('data');
        // console.log('le atob ',atob(String('YWJlbA==')))
        
        if (data) {
          // console.log('la data : ',data)
          // Exemple de décryptage en Base64 (ou toute autre méthode utilisée)
          try {
            const decodedId = atob(data); // Décoder les données Base64
            // console.log('ID Décodé:',JSON.parse(decodedId) );
            const leJson = JSON.parse(decodedId)
            this.idSeller = leJson.idSeller
            // console.log('id du seller :',this.idSeller)
            this.getInfoProduit(leJson.idProduit)
            // this.router.navigate([], {
            //   queryParams: {}, // Supprime tous les paramètres
            //   replaceUrl: true, // Remplace l'URL actuelle dans l'historique
            // });
            // this.getInfoProduit(12)
          } catch (e) {
            console.error('Erreur de décodage:', e);
          }
        }
      });
      this.getVilles()
      // this.getInfoProduit(12)
      this.buildForm()
    }

    replaceText(text: any) {
      return text.replace(/\r\n|\n/g, '</br>')
    }

  openDrawer() {
    console.log('openDrawer');
    this.visible = true;
  }

  search(event: AutoCompleteCompleteEvent) {
    // this.villes = [...Array(10).keys()].map(item => event.query + '-' + item);
    console.log(event)
}

getTimeLabel(): string {
  const now = new Date(); // Obtenir la date et heure actuelles
  const currentHours = now.getHours(); // Heure actuelle
  const currentMinutes = now.getMinutes(); // Minutes actuelles

  // Vérifier si l'heure actuelle est avant 14h30
  if (currentHours < 14 || (currentHours === 14 && currentMinutes < 30)) {
    return 'avant 16h00';
  }

  return 'demain avant 12h';
}


  buildForm() {
    let fv: any = this.data
    this.itemForm = this.fb.group({
      person:"client",
      // brand:['' ,[]],
      product_id:[fv && fv.product_id ? fv.product_id : '' ,[]],
      city_id:[fv && fv.city_id ? fv.city_id : '' ,[Validators.required]],
      name:[fv && fv.name ? fv.name : '' ,[Validators.required]],
      phone_number:[fv && fv.phone_number ? fv.phone_number : '' ,[Validators.required]],
      quantity:[fv && fv.quantity ? fv.quantity : '',[Validators.required]],
      focal_point_id:0,
      price:[fv && fv.price ? fv.price : '',[]],
      detail:'',
      size:[fv && fv.size ? fv.size : '',[]],
      color:[fv && fv.color ? fv.color : '',[]],
      seller_id:''
    })

    

  }

  fValue(chp:any){
    return this.itemForm.get(chp)?.value
  }

  handleOk() {
    this.loading=true
    let res = this.itemForm.value;
    res.product_id = this.produit.product.id
    res.city_id = res.city_id.id
    res.price = this.produit.price
    res.seller_id=this.idSeller
    console.log('envoie',res)
    this.add(res)
  }

  getVilles(obj?:any){
    this.villesService.get().subscribe({
      next: (data) => {
        this.utilisService.response(data, (d:any) => {
          console.log('villes',d)
          this.villes=d.data;
        });
      },
      error: (error) => {
        this.utilisService.response(error,(d:any)=>{
     this.messageService.add({
            severity: 'error',
            summary: 'Attention',
            detail: d?.error?.message,
          })
        })
      },
    });
  }

  getInfoProduit(obj?:any){
    this.cloneProductService.get(obj).subscribe({
      next: (data) => {
        this.utilisService.response(data, (d:any) => {
          console.log('produit',d)
          this.produit=d.data;
          // this.title.setTitle('Détails du produit');
          // this.meta.updateTag({ name: 'og:image', content: this.produit.product.images[0] });
          this.meta.updateTag({ name: 'og:type', content: 'product.item' });
          this.meta.updateTag({ name: 'og:title', content: this.produit.title });
          this.meta.updateTag({ name: 'og:description', content: this.produit.price+' FCFA' });
          this.meta.updateTag({ name: 'og:site_name', content: 'Daymond Distribution' });
        });
      },
      error: (error) => {
        this.utilisService.response(error,(d:any)=>{
     this.messageService.add({
            severity: 'error',
            summary: 'Attention',
            detail: d?.error?.message,
          })
        })
      },
    });
  }


  add(annonce: any){
    console.log(annonce)
    // this.list_subsc.add(
      this.commandeService.create(annonce).subscribe({
        next: (data) => {
          this.utilisService.response(data, (d: any) => {
            this.loading=false
            this.router.navigate(['/success'])
            this.messageService.add({
              severity: 'success',
              summary: 'Succes',
              detail: 'La commande a été passée avec succès',
            })
           
          });
        },
        error: (error) => {
      this.utilisService.response(error,(d:any)=>{
        this.loading=false
   this.messageService.add({
          severity: 'error',
          summary: 'Attention',
          detail: d?.error?.message,
        })
      })
    },
      })
    // );
  }

  gereCompteur(obj:any){
    this.cpt = this.cpt + obj
  }

  gereQte(obj:any){
    // if(this.qte!=0){
      this.qte = this.qte + obj
    // }
    
  }
}
