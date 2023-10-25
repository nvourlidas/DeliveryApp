export default [
             {
              component: 'CNavGroup',
              name: 'Εισαγωγή Χρήστη',
              to: '/main/Admins',
              icon: 'cil-cursor',
              items: [
                {
                  component: 'CNavItem',
                  name: 'Εισαγωγή Διανομέα',
                  to: '/main/Admins/AddUser',
                },

                {
                    component: 'CNavItem',
                    name: 'Εισαγωγή Καταστήματος',
                    to: '/main/Admins/AddShop',
                  },
              ],
            },

            {
              component: 'CNavGroup',
              name: 'Προβολή Χρηστών',
              to: '/main/Admins',
              icon: 'cil-library-building',
              items: [
                {
                  component: 'CNavItem',
                  name: 'Προβολή Διανομέων',
                  to: '/main/Admins/ReadDel',
                },
                {
                  component: 'CNavItem',
                  name: 'Προβολή Καταστημάτων',
                  to: '/main/Admins/ReadShop',
                },
                {
                  component: 'CNavItem',
                  name: 'Επεξεργασία',
                  to: '/main/Admins/EditUser',
                },
              ]
            },

            {
              component: 'CNavGroup',
              name: ' Παραγγελίες',
              to: '/main/Admins',
              items: [
                {
                  component: 'CNavItem',
                  name: 'Δημιουργία Παραγγελίας',
                  to: '/main/Admins/ACreateOrders',
                },

                {
                  component: 'CNavItem',
                  name: 'Ανοιχτές Παραγγελίες',
                  to: '/main/Admins/AdminOpen',
                },

                {
                  component: 'CNavItem',
                  name: 'Σημερινές Παραγγελίες',
                  to: '/main/Admins/TodayOrders',
                },

                {
                  component: 'CNavItem',
                  name: 'Ιστορικό Παραγγελιών',
                  to: '/main/Admins/Istoriko',
                },
              ]
            },

            

]