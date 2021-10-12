import { Injectable } from '@angular/core';

export class Locale {
    Name!: string;
    Value!: string;
}

let locales: Locale[] = [{
    "Name": "English",
    "Value": "en"
}, {
    "Name": "Deutsch",
    "Value": "de"
}, {
    "Name": "فارسی",
    "Value": "fa"
}, {
    "Name": "Turkish",
    "Value": "tr"
}, {
    "Name": "Русский",
    "Value": "ru"
}];

export class Payment {
    PaymentId!: number;
    ContactName!: string;
    CompanyName!: string;
    Amount!: number;
    PaymentDate!: string;
}

let payments: Payment[] = [{
    "PaymentId": 1,
    "ContactName": "Nancy Davolio",
    "CompanyName": "Premier Buy",
    "Amount": 1740,
    "PaymentDate": "2021/01/06"
},
{
    "PaymentId": 2,
    "ContactName": "Andrew Fuller",
    "CompanyName": "ElectrixMax",
    "Amount": 850,
    "PaymentDate": "2021/02/13"
},
{
    "PaymentId": 3,
    "ContactName": "Janet Leverling",
    "CompanyName": "Video Emporium",
    "Amount": 2235,
    "PaymentDate": "2021/03/07"
},
{
    "PaymentId": 4,
    "ContactName": "Margaret Peacock",
    "CompanyName": "Screen Shop",
    "Amount": 1965,
    "PaymentDate": "2021/04/03"
},
{
    "PaymentId": 5,
    "ContactName": "Steven Buchanan",
    "CompanyName": "Braeburn",
    "Amount": 880,
    "PaymentDate": "2021/05/10"
},
{
    "PaymentId": 6,
    "ContactName": "Michael Suyama",
    "CompanyName": "PriceCo",
    "Amount": 5260,
    "PaymentDate": "2021/05/17"
},
{
    "PaymentId": 7,
    "ContactName": "Robert King",
    "CompanyName": "Ultimate Gadget",
    "Amount": 2790,
    "PaymentDate": "2021/06/21"
},
{
    "PaymentId": 8,
    "ContactName": "Laura Callahan",
    "CompanyName": "EZ Stop",
    "Amount": 3140,
    "PaymentDate": "2021/06/01"
},
{
    "PaymentId": 9,
    "ContactName": "Anne Dodsworth",
    "CompanyName": "Clicker",
    "Amount": 6175,
    "PaymentDate": "2021/07/24"
},
{
    "PaymentId": 10,
    "ContactName": "Clark Morgan",
    "CompanyName": "Store of America",
    "Amount": 4575,
    "PaymentDate": "2021/07/11"
}];

export class PaymentView {
    public Number!: string;
    public Contact!: string;
    public Company!: string;
    public Amount!: string;
    public PaymentDate!: string | undefined;
    public Home!: string;
    public Profile!: string;
    public Tasks!: string;
    public SignIn!: string;
    public ResetPassword!: string;
    public SignUp!: string;
    public ChangePassword!: string;
}

export class Dictionary {
    [key: string]: PaymentView;
}

let dictionary = {
    "en": {
        "Number": "Number",
        "Contact": "Contact",
        "Company": "Company",
        "Amount": "Amount",
        "PaymentDate": "Payment Date",
        "Home": "Home",
        "Profile": "Profile",
        "Tasks": "Tasks",
        "SignIn": "Sign In",
        "ResetPassword": "Reset Password",
        "SignUp": "Sign Up",
        "ChangePassword": "Change Password"
    },
    "de": {
        "Number": "Nummer",
        "Contact": "Ansprechpartner",
        "Company": "Firma",
        "Amount": "Betrag",
        "PaymentDate": "Zahlungsdatum",
        "Home": "Home",
        "Profile": "Profile",
        "Tasks": "Tasks",
        "SignIn": "Sign In",
        "ResetPassword": "Reset Password",
        "SignUp": "Sign Up",
        "ChangePassword": "Change Password"
    },
    "fa": {
        "Number": "عدد",
        "Contact": "مخاطب",
        "Company": "شرکت",
        "Amount": "مبلغ",
        "PaymentDate": "تاریخ پرداخت",
        "Home": "خانه",
        "Profile": "پروفایل",
        "Tasks": "وظایف",
        "SignIn": "ورود",
        "ResetPassword": "باز نشانی کلمه عبور",
        "SignUp": "ثبت نام",
        "ChangePassword": "تغییر کلمه عبور"
    },
    "tr": {
        "Number": "Sayı",
        "Contact": "Temas",
        "Company": "Şirket",
        "Amount": "Miktar",
        "PaymentDate": "Ödeme tarihi",
        "Home": "Ana Sayfa",
        "Profile": "Profil",
        "Tasks": "Görevler",
        "SignIn": "Kayıt olmak",
        "ResetPassword": "Şifreyi yenile",
        "SignUp": "Üye olmak",
        "ChangePassword": "Şifre değiştir"
    },
    "ru": {
        "Number": "Номер",
        "Contact": "Имя",
        "Company": "Организация",
        "Amount": "Сумма",
        "PaymentDate": "Дата оплаты",
        "Home": "Home",
        "Profile": "Profile",
        "Tasks": "Tasks",
        "SignIn": "Sign In",
        "ResetPassword": "Reset Password",
        "SignUp": "Sign Up",
        "ChangePassword": "Change Password"
    }
};

@Injectable({ providedIn: 'root'})
export class Service {
    getPayments() {
        return payments;
    }
    getLocales() {
        return locales;
    }
    getDictionary() {
        return dictionary;
    }
}