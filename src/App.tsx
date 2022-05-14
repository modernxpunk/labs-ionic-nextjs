import {
  IonApp,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

setupIonicReact();


// unit of upkeep an army
interface IUpkeep {
  [key: string]: number | IUpkeep
}

interface IForce {
  gold: number, // gold per day
  speed: number, // km/h
  count: number,
  upkeep: IUpkeep // meal, wine, water
}

class Army {
  army: IForce[];

  constructor(army: IForce[]) {
    this.army = army
  }

  get getMinSpeed(): number {
    let maxSpeed = 0
    for (let i = 0; i < this.army.length; i++) {
      maxSpeed = Math.min(maxSpeed, this.army[i].speed)
    }
    return maxSpeed
  }

  get getMaxSpeed(): number {
    let maxSpeed = 0
    for (let i = 0; i < this.army.length; i++) {
      maxSpeed = Math.max(maxSpeed, this.army[i].speed)
    }
    return maxSpeed
  }

  get getArmy(): IForce[] {
    return this.army
  }

  get getAverageSpeed(): number {
    let averageSpeed = 0
    for (let i = 0; i < this.army.length; i++) {
      averageSpeed += this.army[i].speed
    }
    averageSpeed /= this.army.length
    return averageSpeed
  }

  get getGolds(): number {
    let golds = 0
    for (let i = 0; i < this.army.length; i++) {
      golds += this.army[i].gold * this.army[i].count
    }
    return golds
  }

  getInfo(i: number): string {
    let info = ''
    const { gold, speed, count } = this.army[i]
    info += `gold per day: ${gold}speed: ${speed}km/h, count: ${count}\n`
    return info
  }

}

const paladin = {
  gold: 2,
  count: 10,
  speed: 5,
  upkeep: {
    "hourse": 3, // 1 paladin = 1 hourse = 3 feed per day
    "wine": 3
  }
}

const bears = {
  gold: 0, // meal per day
  count: 5,
  speed: 15,
  upkeep: {
    "meal": 1
  }
}

const infantry = {
  gold: 1,
  count: 100,
  speed: 5,
  upkeep: {
    "wine": 1
  }
}

const army = new Army([paladin, bears, infantry])

const App: React.FC = () => {

  return (
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Маурін Андрій</IonTitle>
              <IonTitle>КН-32</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Модуль</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  Завдання
                </IonCardTitle>
                <IonCardSubtitle>
                  Середньовічний король вирішив оголосити війну сусідній державі для чого необхідно сформувати своє військо та розрахувати вартість його утримання та швидкість пересування. Після обліку наявних військових одиниць виявилось, що у військо можна записати паладинів у важкій броні(вартість утримання 2 золотих на добу + корм для коней+ дари богу у вигляді віна (3 склянки віна на добу), швидкість пересування 15 км на годину), бойових ведмедів (вартість утримання м‘ясо, швидкість пересування 30 км/ч), піхоти у шкіряній броні (вартість утримання 1 золотий на добу + склянка вина для підтримки марального духу, швидкість 5 км/ч).Необхідно сформувати військо з як мінімум 3 родів військ і розрахувати вартість утримання та швидкість. Результати такого планування необхідно виводити на екран.
                </IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>
                  Відповідь
                </IonCardSubtitle>
                {army.getArmy.map((_: any, i) => {
                  return (
                    <IonItem key={i}>
                      {army.getInfo(i)}
                    </IonItem>
                  )
                })}
                <IonItem>
                  Golds: {army.getGolds}
                </IonItem>
                <IonItem>
                  Average speed: {army.getAverageSpeed.toFixed(2)} km/h
                </IonItem>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  )
}


export default App;
