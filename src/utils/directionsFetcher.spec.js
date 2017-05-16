import directionsFetcher from './directionsFetcher'

test('directionsFetcher returns directionsResult', () => {
  const service = jest.fn((request, cb) => {
    return cb('OK', directionsResult())
  })

  return directionsFetcher.get(service, {
    origin: 'Origin Address',
    destination: 'Destination Address',
    travelMode: 'DRIVING',
  }).then(function(resp) {
    expect(resp.status).toEqual('OK')
    expect(resp.result).toEqual(directionsResult())
  })
})

function directionsResult() {
  return {
    geocoded_waypoints: [
      {
        geocoder_status: 'OK',
        place_id: 'ChIJa147K9HX3IAR-lwiGIQv9i4',
        types: [
          'amusement_park',
          'establishment',
          'point_of_interest',
        ],
      },
      {
        geocoder_status: 'OK',
        partial_match: true,
        place_id: 'ChIJzzgyJU--woARcZqceSdQ3dM',
        types: [
          'amusement_park',
          'establishment',
          'point_of_interest',
        ],
      },
    ],
    routes: [
      {
        bounds: {
          northeast: {
            lat: 34.1358596,
            lng: -117.9220826,
          },
          southwest: {
            lat: 33.8151707,
            lng: -118.3517014,
          },
        },
        copyrights: 'Map data ©2017 Google',
        legs: [
          {
            distance: {
              text: '35.6 mi',
              value: 57265,
            },
            duration: {
              text: '47 mins',
              value: 2835,
            },
            end_address: '100 Universal City Plaza, Universal City, CA 91608, USA',
            end_location: {
              lat: 34.1358596,
              lng: -118.3511483,
            },
            start_address: '1313 Disneyland Dr, Anaheim, CA 92802, USA',
            start_location: {
              lat: 33.8162219,
              lng: -117.9224731,
            },
            steps: [
              {
                distance: {
                  text: '59 ft',
                  value: 18,
                },
                duration: {
                  text: '1 min',
                  value: 2,
                },
                end_location: {
                  lat: 33.8160679,
                  lng: -117.9225314,
                },
                html_instructions: 'Head <b>south</b>',
                polyline: {
                  points: 'kvkmElvvnU\J',
                },
                start_location: {
                  lat: 33.8162219,
                  lng: -117.9224731,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.4 mi',
                  value: 569,
                },
                duration: {
                  text: '2 mins',
                  value: 113,
                },
                end_location: {
                  lat: 33.8151707,
                  lng: -117.9280369,
                },
                html_instructions: 'Keep <b>left</b>',
                maneuver: 'keep-left',
                polyline: {
                  points: 'mukmExvvnUH@H@JDJHNJJJPTN\Lb@B`@?h@@v@DdYZ?R?',
                },
                start_location: {
                  lat: 33.8160679,
                  lng: -117.9225314,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.6 mi',
                  value: 1028,
                },
                duration: {
                  text: '2 mins',
                  value: 115,
                },
                end_location: {
                  lat: 33.8200876,
                  lng: -117.9228559,
                },
                html_instructions: 'Turn <b>left</b>',
                maneuver: 'turn-left',
                polyline: {
                  points: 'yokmEfywnUAyW?u@@k@Cg@EUO]KSOSIOKQOOQK]U[Mm@Q}@Ug@Km@Ig@Ec@A[?U@U@U@[DA?WBG@g@HkAZeAVkBb@_AV_@N',
                },
                start_location: {
                  lat: 33.8151707,
                  lng: -117.9280369,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '230 ft',
                  value: 70,
                },
                duration: {
                  text: '1 min',
                  value: 6,
                },
                end_location: {
                  lat: 33.8206848,
                  lng: -117.9230995,
                },
                html_instructions: 'Merge onto <b>Disneyland Dr</b>',
                maneuver: 'merge',
                polyline: {
                  points: 'qnlmEzxvnUa@LsA`@',
                },
                start_location: {
                  lat: 33.8200876,
                  lng: -117.9228559,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '22.3 mi',
                  value: 35909,
                },
                duration: {
                  text: '26 mins',
                  value: 1533,
                },
                end_location: {
                  lat: 34.0256318,
                  lng: -118.2059435,
                },
                html_instructions: 'Slight <b>right</b> to merge onto <b>I-5 N</b> toward <b>Los Angeles</b>',
                polyline: {
                  points: 'grlmEjzvnUu@MKCIAWI_Cy@WGSGMEQEKCYCMAU?a@@E@E?MBE@I@IBKBWLE@EBIDGDKF}ArAeFlEWTs@l@qAjA_@\]p@}ApAg@b@iAdA}BbCSTYXmExEsAxAOP[^cBlBw@x@qBtB}@~@{B`Cs@x@KLEBEDSPGF_BhCa@r@Wh@Wf@Sf@c@jAOb@K^ITW`AMd@_@xAWnAU`Bm@jEi@`Eu@hFOv@GXWlAMh@e@|AM`@M^KX{@vBkJtSmKhVgB|DiFlLeFfLWl@Q^Uf@_@t@a@r@a@r@A@Yd@y@zA}@|AQZYd@[h@U`@QZ[l@c@|@_@v@{@rBUn@s@hB_BjE_BtDuEhLu@hB[t@aChGQf@{CjHcDtHiItRkAdCuAdCy@rAgA~Aa@l@aB|BGHgAtAu@dAeGlIe@z@?@A@IPKRA@?@GJSd@_@~@Qh@Qh@WdAADIb@YrAe@~BGREVSbAU~@kAlE_A|Eg@zBADWbAOn@}@hCQh@k@~AcB~DYp@Wh@qAjCc@x@yBvD_BpC[f@eAfBgChFaBrDc@`AyHhQsAbDmAjCKV]v@uBxEuBvEoBnEsAnCABGHGNINEJCJGJGRc@`A[t@c@`AoAlCmBjEMZ]t@_@z@w@bBe@|@c@r@OTOTU\g@v@a@h@g@n@e@j@Y^QRi@l@_@b@MPA?_@f@GFw@`AiBjCe@r@S^a@t@Ub@g@fACDc@`A_@z@mBjEiBbEg@lAcAzBYl@Wn@GJIRaBxDuCvGuEnK_ArBiBbE}@rBcAzBqBtEkBdEqA|CcAzBkErJ_AvBcA`Cc@v@y@jBo@nAsFdJ[p@Q^uAlDc@fAUh@q@~AaBbEgBlEsHzQeDjIyC|GGLyB~EaFdLaAjBkBvD{AxCaC`Fu@hBw@bBc@~@gFhKkC`GaAfCoBbFe@tAeAzCiBpEqBvEaAnBoA`Ck@`Ak@`A{@tA{@rAeBbCkBfC}AjBwBbCyBvBkClCCB{BxBeDdDKHwBxBqBtA}A|@gAx@kApAeBxBW`@[d@i@|@Yf@[l@g@`AuAzCw@`BIRm@zAs@bBuAhCgArBcB|ByAvBa@l@m@~@c@j@s@z@aAlAy@dAiAdAyAjAw@n@UNuBnAwAz@]T_@TqFjD]RIF]RGD]TcHlE_Aj@mf@zZeEhC]T]Tk@ZuBrAaKlGcAp@wNbJSLm@^wAz@a@V{@h@sDvBqAt@wBnAGBoBjA}BrAKFGDu@b@k@Xi@XeNdIcAn@_Ah@{BlAaAj@]RKF_@Ru@b@GDm@\yAz@w@b@eAn@q@`@qEhC{A~@cDjBkAp@cAl@_FtC_@T_@T_Ap@y@n@g@b@iAfAa@`@UXmAvAa@j@QVwAvBk@|@}A`CeA`B{BhDeA~A_@l@iAfB}@rAeEpGo@bAMPSZCBuAvByBhDo@|@a@p@}@rAm@`AU\q@dAwBdDeCxDsEbHSZSZg@n@SVe@j@_@^[\kAdAe@\UNgC`Bk@\KFq@XgAb@g@Pm@Po@PYHQDaDp@gAVmHxAmAVeB`@_IzAWFw@R}@Z]Lu@Vm@T_@ReAf@}A|@e@VGDSL{@h@i@^s@j@cAr@}B~A[PeAr@mClB_@\cAz@qAnAoApA_A|@{A|AYX_A~@}@|@yBxBuBtBoBpBmAlA{AzAeBdBkAhAeAhAg@f@KLOPs@|@a@n@QXq@fA{@vAy@tA]l@[b@w@pA[b@a@d@y@|@w@v@YT?@CBKJA?ON]\kClCmAlA}@t@{@v@A@wEjEoJbJeJ|IaC|B]Zc@^ED]Zo@n@q@l@MNc@\o@d@m@`@cAj@aAh@q@Xq@Zq@^i@ZC@k@\cAt@}@t@sBnByCpCkB`B}AzA_CvB}AvAu@r@cA`AoAtAsMnOuAdBy@pAk@bAi@hA_AnBo@fAQZQV_ApAgAnAo@j@SPq@n@mD~C_@\OHWVg@f@e@h@g@p@a@l@QXk@hAy@lBeAxCYr@w@zBaAtC{GpRcA|CYfAW~Au@zDMr@k@|B]`Ae@fAg@dAq@pAMVKP?@A@?@Wb@MXGNGNCHA@Yt@CDABg@~ASl@Of@Wr@cAbDaAlCkCrHa@hAA@GNq@lBe@vAe@dBWbACLMt@m@vDOrAKrAGjAEdBCbC@|J@zM?lB?nE?rEAbDCv@EhAA`@C`@O|AGn@QpAMx@O|@Kh@Mf@Qt@Of@W|@Sp@wBpGiAfD{@jCmNrb@_@fAMb@_@rAa@zAY|@',
                },
                start_location: {
                  lat: 33.8206848,
                  lng: -117.9230995,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '11.7 mi',
                  value: 18810,
                },
                duration: {
                  text: '17 mins',
                  value: 991,
                },
                end_location: {
                  lat: 34.1294658,
                  lng: -118.3475583,
                },
                html_instructions: 'Keep <b>left</b> at the fork to continue on <b>US-101 N</b>, follow signs for <b>Los Angeles N</b>/<b>Civic Center</b>',
                maneuver: 'fork-left',
                polyline: {
                  points: 'estnEbbnpUBh@?@CLm@fCW`A]lAUt@cApCg@xAq@nBu@vBkD~Jo@nBq@lBm@fBi@|AABUr@CH?@A@W|@Up@INm@`Bw@vBWp@gAhCS\c@~@MTMTQZc@p@OVc@l@a@j@s@|@i@p@SRA@WJa@d@A@YZs@r@yAlAm@`@]TOHMHQFQJe@PQHKBiAZa@LWDg@FOB]Dy@Du@@u@As@EoBWy@Gu@Ek@?MAQ?_@@[BmAFy@Fa@@U@a@?W?a@Aa@Ca@C]Cm@KWCKCmASyC]}CU]Ak@Ae@?aEBoC@k@?}AFi@@uAJk@Di@Hm@Fm@JyAXi@LcBd@_A\c@PsAh@UHeAh@q@TOHc@Pa@Pe@P}@^{Al@WNUNm@f@ONY^SXEHCBYj@[z@A??BUp@CLAHCJAHCP?HCNAPARAb@Er@?HAF?DAJAJG^AJC^AFATE\OnAU~BKhAEZC`@CNKrAIpAGt@IdAGj@ATCRWbDGz@GhACRAZALC~@AXEj@ANO~BM~AG`ACf@?r@?Z@v@Bx@B|@@f@A`@Ad@C^C^G`@Ov@K`@KXY~@KVMXMXWf@Ub@m@fAq@pAc@x@[l@Wf@_@p@]n@o@jAk@dAiAvBOVeApB}@`Bi@|@i@|@W`@OT]f@_AxAc@n@[`@Y^s@`Ai@p@Y\MLUVIHKJc@b@y@r@SLk@f@o@f@C@CBgCtBk@d@eBvAEBOLC@SNIFCBCBUPA@c@^WRi@d@IJSR[ZMNQPQT_@j@W^g@x@]h@mAhBs@dAQXe@t@_CnD_BbCeAfBS^Wj@c@|@Yr@IRu@tBk@fBk@xBkAlEc@bBaAzDk@~BMf@u@tCAFUz@Qt@i@pBc@fB]nAuAvEWn@ITA??@ABKXcA~C_CtG?@A@yBfHOj@a@rAABCHEJYbAw@dCiB~EeAlCGPg@zAo@jB{@bDKb@Mj@Ml@k@lCe@lC[~Au@~Dq@rDS|@Y|ACHAJMn@ETERKh@[pBm@jEA@Kt@ADc@fDg@lDYpB[pBc@fDMjAShBO~AQtAIt@MbAKp@Kh@Ib@Or@]tAUx@Wz@c@lAKZYp@k@pAYr@k@jAMZeAbCuAhD}@dC}@`Cm@dBQd@Up@wB~FSh@g@rAEHSb@_@x@a@z@_@t@?@Yj@]n@e@v@o@bAiAjBi@z@ILABYf@MPqBfDo@bAk@~@a@p@MPcBhCY^i@p@g@n@i@f@k@j@k@d@e@^sBxAMFo@^eIdEyAv@w@`@g@Vq@b@]To@d@WRa@^_A`Ai@p@W^SX_@r@q@lAABgApBeAnBGJEHo@fA?@cAlBGHCFk@bAGFs@jAY`@e@l@c@j@QPGD_@`@_@^e@b@YVq@h@YPeAr@cAj@IFo@^kB|@gKfFaDzAs@`@_CnB_AdAUXQRU\g@~@i@dA]|@Y|@]tAQ`AM|@Gn@ALG|@Ej@E~@?\Ah@AvA?F?H?J?HAv@?v@C|@E|@Gz@AFIt@EZG^Qx@Mj@IZ?@A?Of@Ob@_@`AIRYn@Yh@]j@u@vAu@vAOZ[h@]p@Uf@s@vAcDxGcApByBhEQXkA`Cg@|@Ud@q@hAo@|@iAvAKLQNCD]XMJg@`@_@Xa@Vu@`@q@Zg@Ra@Ly@Tu@Ro@Ns@Ni@La@HiDv@WFgAT}Cn@kCh@eAJgCf@wA^q@Ra@NaAZ]Lo@Xa@P}@`@eAj@cAn@aAn@}@n@e@^]Z}@v@eAdAy@|@CBUX}CtDSXY\Y\?@A?kB~BsBfC[`@]\MRSPg@b@YTk@^_Al@eB`AgJbIKHYZMJm@n@wBxBo@p@',
                },
                start_location: {
                  lat: 34.0256318,
                  lng: -118.2059435,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.1 mi',
                  value: 180,
                },
                duration: {
                  text: '1 min',
                  value: 11,
                },
                end_location: {
                  lat: 34.1307998,
                  lng: -118.3485738,
                },
                html_instructions: 'Take exit <b>11B</b> toward <b>Universal Studios Blvd</b>',
                maneuver: 'ramp-right',
                polyline: {
                  points: 'e|hoEfwiqUAACAA?A?C?E?A@C@MHURYXKHa@^WV[VKJMLIFIFKHCBA?A?A@A?A?C?CA',
                },
                start_location: {
                  lat: 34.1294658,
                  lng: -118.3475583,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.3 mi',
                  value: 416,
                },
                duration: {
                  text: '1 min',
                  value: 29,
                },
                end_location: {
                  lat: 34.1337248,
                  lng: -118.3513343,
                },
                html_instructions: 'Merge onto <b>W.C. Fields Dr</b>',
                maneuver: 'merge',
                polyline: {
                  points: 'odioEp}iqUMNQJYR_@Re@XaAp@e@ZA@SLWRQLEBKLIHMNMNONW\SZU`@GJKNILEHEDEDCBCBCBC@EDEBEBC@EDCBEBEBCDCBC@CBEFCBCDEDEF?@',
                },
                start_location: {
                  lat: 34.1307998,
                  lng: -118.3485738,
                },
                travel_mode: 'DRIVING',
              },
              {
                distance: {
                  text: '0.2 mi',
                  value: 265,
                },
                duration: {
                  text: '1 min',
                  value: 35,
                },
                end_location: {
                  lat: 34.1358596,
                  lng: -118.3511483,
                },
                html_instructions: 'Turn <b>right</b> onto <b>Universal Studios Blvd</b>',
                maneuver: 'turn-right',
                polyline: {
                  points: 'wvioExnjqUC?A?A??@A??@EFCFEFCHCDEHAB?BA@A@A?A@A@A@A?A@G?A?A?A?C?CAA?CAAAA??AA?CAEAC?A?A?A?A?A?A?OQCAAAECUMGCGCECGCGCICICICGAECKACAGAIAGAGAG?IAQAWAIAI?K?KAE@I?G?',
                },
                start_location: {
                  lat: 34.1337248,
                  lng: -118.3513343,
                },
                travel_mode: 'DRIVING',
              },
            ],
            traffic_speed_entry: [],
            via_waypoint: [],
          },
        ],
        overview_polyline: {
          points: 'kvkmElvvnU|@Tx@v@\`ABjAF|Zn@?Cc\Us@[g@Ua@a@[y@c@kBg@aD]}AD}@JeH`BuEvAcB]yDoAeAOcABg@Jo@V{BfBcK|I}@nAeCtBuFxFmIdJmOjPaChDeBlDiAdD}ApGcDxU}@hEmAxD}[tt@yNb\yBdEqFnJqB~DeFxMgK~VsMr[uKzVoCxEsEtG}BzCkHhKWh@]t@{AxEcClLkCjLi@`CwBfHaEzJuBdEyEhIaBnCiF|K_Oz\{MdZwAbDaKbUiB|CgCnDkDbEiE|FqBlDsLdXqQra@kX|m@aF|KcHtLm@pAaE~JcTxh@}Np\kK~SyJvSmEhKuCxHoDlJsDfIcFzIaDvEiErFaKlKeLbLoErCsCjCcE~FsDrHcDtH}C|F}DtFgDtE{BrCcDpC{GjEmIjFez@vh@od@lYw^dTyl@l]oKjG_JrFmE|DwCtDsQxXiP|VcOhUcHjKuB`CgCrBqF`DmExAuGxAaXnFkDdAiEhB_DhBkQ|LeGzFuFtFyVxViCpCyCnEoD~FsAtB{AbBuArA{@x@cg@xe@wIhIeEpCwE~B}CpBwLxKqJ~IsCvCiPtReBtCiBxDsClE}D|D}EfEmCzCs@fAeBvDyE~M_JnWq@fDcAnFiA~DmCvFcAtBaBxE}IlWeCzHi@fC}@jGS~CIhF@|J@l^MfIm@`Gw@hEmAlEkVxt@oBzGY|@Bh@CNyBlI}CzI}K~[sA`EeEtKsAhCiBrCsCnD{@r@iD~CiBjA{An@oCr@oCVkB?cD]iDOoHX}BIoBWgFq@{DWcLBiGTqDb@cCf@cDbAsEnB_JrDmBfBw@rA_A~Ci@lHgAzKmAzOc@hIg@pHAnDF`EQfCaArD_ArBkGnLmKpRsGlJgBtBsBlBqKvI_Ar@wDhD}FpIkFdIqEvH}BzFgErOeGdVaAvDmBfGKVqErM{BjHw@lC_@nAaDdJeDfJcB`HgGt[sBnMaEhZ_AtIo@bE{A~FuBlFyC~G_GvOsD`KaBzD{A~C}DvGkHrLmDlFgDtDsEfDgO~HgDvBcDfDuGlLyD~GwCfEyAxAkCvBcEfCiUbL_EtDg@l@}@|AgAbCw@rC_@~BWfDI~EKrGYtCq@`DeBrEcGdLqPl\aBfCuAdBaAz@_DtBuDrAoN`DiHxAmEr@mF~AmDzAiGzDgExDqFpGeI`KgBfBkFdD{KtJwExEe@JkD`Di@^KAyAbAsE|Cq@v@qAjBw@fAg@^}@z@i@`AUDQGSC]UkAi@cAUoCK',
        },
        summary: 'I-5 N and US-101 N',
        warnings: [],
        waypoint_order: [],
      },
    ],
    status: 'OK',
  }
}