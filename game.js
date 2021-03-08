const body = document.getElementById('section-body');
const textElement = document.getElementById('text');
const optionBtnsElement = document.getElementById('option-btns');

let state = {};
// body.style.background = "url('img/right-bg.jpg')";

function startGame() {
    state = {};
    showTextNode(1);
    body.style.background = "center center / cover url('img/forest-bg.jpg')";
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
    textElement.innerText = textNode.text;

    while (optionBtnsElement.firstChild) {
        optionBtnsElement.removeChild(optionBtnsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const btn = document.createElement('button');
            btn.innerText = option.text;
            btn.classList.add('btn');
            btn.addEventListener('click', () => selectOption(option));
            optionBtnsElement.appendChild(btn);
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame();
    }
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
    console.log(option);

    if ((option.nextText == 2) || (option.nextText == 3)) {
        body.style.background = "center center / cover url('img/forest-bg.jpg')";
    } else if (option.nextText == 4) {
        body.style.background = "center center / cover url('img/right-bg.jpg')";
    } else if (option.nextText == 5) {
        body.style.background = "center center / cover url('img/left-with-bg.jpg')";
    } else if (option.nextText == 6) {
        body.style.background = "center center / cover url('img/left-without-bg.jpg')";
    }
}

const textNodes = [{
        id: 1,
        text: "De bon matin, le soleil étant au rendez-vous, vous décidez de partir vous promener en forêt. Au bout de quelques minutes de marche, vous vous arrêtez près d'un arbre tordu de sorte qu'il forme un ''S''. Regardant autour de vous, vous remarquez alors un nouveau passage. Vous sentant l'âme aventurière, vous l'empruntez.",
        options: [{
            text: "Emprunter le passage",
            nextText: 2
        }]
    },
    {
        id: 2,
        text: "Vous arrivez dans une sorte de sous-bois, les arbres vous entourant semblant dépasser bien largement le reste de la forêt. Tournant autour de vous pour ne rien manquez de la vue que vous offre votre découverte, vous remarquez bien vite que vous vous êtes perdu, le passage de votre arrivée ressemblant étrangement aux deux autres voies faces à vous. En observant bien, vous apercevez au fond du chemin central l'arbre ''S'' auprès duquel vous vous étiez arrêtez. En vous approchant du chemin de droite, vous entendez le chant d'oiseaux que vous n'avez jamais entendu auparavant, une forte odeur de fleurs vous prenant le nez. En observant attentivement, vous pouvez apercevoir les rayons du soleil passer au travers des arbres au loin. Le chemin de gauche, pour sa part, ne donne pas très envie de l'emprunter. En effet, vous ne pouvez apercevoir quelque lumière que ce soit, n'entendez aucun son émanant de cette voie, ni odeur quelle qu'elle soit. En cherchant une lampe dans vos poches, vous trouvez un mouchoir et un briquet. Au sol se trouve un bâton.",
        options: [{
                text: "Perdre son côté aventurier et retourner au départ via le chemin central",
                nextText: 3
            },
            {
                text: "Suivre ses sens et emprunter le chemin de droite",
                setState: { rightWay: true },
                nextText: 4
            },
            {
                text: "Prendre le bâton et passer par le chemin de gauche",
                setState: { leftWayWith: true },
                nextText: 5
            },
            {
                text: "Partir sur le chemin de gauche sans prendre le bâton",
                setState: { leftWayWithout: true },
                nextText: 6
            }
        ]
    },
    {
        id: 3,
        text: "Ne sachant pas si vous pourrez retrouver votre chemin, vous préférez la sécurité et retournez sur vos pas.",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: 4,
        text: "Vous décidez donc de suivre vos sens. Vous empruntez cette voie de droite. À mesure que vous vous approchez de la sortie du chemin, le chant des oiseaux ainsi que l'odeur des fleurs se font de plus en plus présents. Une fois sur place, vous vous retrouvez à l'orée d'une magnifique clairière. Cette dernière est extrêmement ensoleillée, seul un immense arbre et quelques formes longues se dessinent au loin. À vue d'œil, la place semble faire plusieurs kilomètres de diamètre, aussi grand voire plus que le parc de votre enfance vous vous dites. Devant la splendeur de ce lieu, vous fermez les yeux. Vous vous sentez bien, tant l'aura de ce lieu est apaisant. Soudain, dans un souffle, vous entendez ''Partez...''. Vous ouvrez les yeux et voyez une sorte de lumière bleutée émanant de l’arbre.",
        options: [{
                text: "Écouter la voix et faire demi-tour",
                nextText: '4-a'
            },
            {
                text: "S’approcher de l’arbre",
                nextText: '4-b'
            }
        ]
    },
    {
        id: '4-a',
        text: "Malgré l’ivresse du lieu, cette voix n’augure rien de bon. Vous vous souvenez de Hansel et Gretel, de leur histoire, mais surtout de la fin qui leur est réservée. Ne vous faisant aucunement prier, vous faites demi tour pour revenir dans le sous bois.",
        options: [{
                text: "Perdre son côté aventurier et retourner au départ via le chemin central",
                nextText: 3
            },
            {
                text: "Prendre le bâton et passer par le chemin de gauche",
                setState: { leftWayWith: true },
                nextText: 5
            },
            {
                text: "Partir sur le chemin de gauche sans prendre le bâton",
                setState: { leftWayWithout: true },
                nextText: 6
            }
        ]
    },
    {
        id: '4-b',
        text: "Vous décidez d’aller vers l’arbre, et vous arrivez au niveau des formes longues que vous voyiez au loin. En arrivant, vous vous apercevez qu’il s’agit en fait d’un cercle de pierres, un chêne majestueux en son centre, ses feuilles produisant une sorte de lumière bleue. Les stèles, d’au moins 2 mètres de haut, sont disposées à un mètre les unes des autres. L’arbre, quant à lui, dépasse bien largement ces dalles qui paraissent bien ridicules à côté. Vous regardez autour de vous, et vos yeux se posent sur une étrange lueur rouge semblant sortir tout droit du coeur de l’arbre. Interloqué, vous vous avancez.",
        options: [{
            text: "Toucher l’arbre",
            nextText: '4-b-1'
        }]
    },
    {
        id: '4-b-1',
        text: "Vous vous approchez doucement de l’arbre. Tout d’abord, vous tendez l’oreille. En vous concentrant, vous avez la curieuse impression que l’arbre respire, et même qu’il parle. Mais pas d’une seule voix, vous entendez plusieurs type de murmure, comme une assemblée discutant le plus silencieusement possible. Vous avez l’impression que le chêne essaie de communiquer avec vous, ou une chose à l’intérieur. Aussi, vous vous penchez vers le tronc, tellement que vous n’avez d’autre choix que de vous soutenir avec vos mains. Au contact de votre peau, vous sentez l’écorce d’adoucir, comme si elle s’étalait sous vos mains. Ce qui vous provoque un mouvement de recul. Cependant, vos mains restent collées, la sève coulant entre vos doigts, puis se solidifiant très rapidement. De là, vous sentez votre énergie s’échapper de votre corps. Vous vous évanouissez.",
        options: [{
            text: "Reprendre connaissance",
            nextText: '4-b-1-a'
        }]
    },
    {
        id: '4-b-1-a',
        text: "Au bout d’un certain temps, vous n’avez absolument aucune idée de combien, vous reprenez connaissance. Tout d’abord, vous essayez d’ouvrir les yeux mais rien n’y fait, impossible. Puis, vous entendez des chuchottements, les mêmes que ceux de l’arbre. En vous concentrant, et en y mettant toutes vos forces, vous arrivez à regagner votre vue. Ce que vous voyez vous laisse perplexe, et sans voix, puisque cette dernière semble avoir totalement disparue. En effet, vous voyez comme si vous étiez dans l’arbre, et plus précisément à la place d’une feuille. Au loin, vous visualisez une personne arriver au loin. En observant bien, vous devinez que cette personne n’est nul autre que vous. Vous essayez de vous débattre, mais vue la hauteur, et la fragilité de votre maintien, vous craigniez une chute. Ce faisant, vous abandonnez toute tentative de vous échapper.",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: 5,
        text: "Vous vous souvenez d’un épisode d’une émission de survie où le présentateur explique comment se faire une torche. Aussi, avec le mouchoir, le briquet et le bâton, vous confectionnez un moyen de vous éclairer. Vous passez par le chemin de gauche et arrivez dans une salle extrêmement sombre, ne permettant d’apercevoir qu’un brin de lumière émanant d’un passage étroit.",
        options: [{
            text: "Emprunter le passage étroit",
            nextText: '5-a'
        }]
    },
    {
        id: '5-a',
        text: "Vous arrivez dans une salle faiblement éclairée, uniquement par quelques torches accrochées ça et là. Vous observez autour de vous et voyez des sortes de troncs placés en deux rangées, de sorte que cela forme un couloir. En regardant de plus prêt, vous pouvez constater que les tronc ont été taillés et sculptés pour leur donner des apparances de statues. Il est seulement dommage qu’avec le peu de lumière que vous possédez vous ne puissiez en distinguer les détails, ces derniers ayant l’air extrèmement réalistes. Vous vous dites que c’est quand même étrange de trouver une pièce au beau milieu d’une forêt, vous décidez donc d’aller observer les murs. Avant d’aller vers le mur, vous apercevez un passage au fond de la salle.",
        options: [{
                text: "Aller observer les murs",
                nextText: '5-a-1'
            },
            {
                text: "Aller vers le passage",
                nextText: '5-a-2'
            }
        ]
    },
    {
        id: '5-a-1',
        text: "Vous empoignez votre torche et vous dirigez vers le mur qui vous fait face. Tout d’abord, vous pensez voir un mur en pierre, comme on trouve dans les château, mais distinguez une sorte de suintement. Vous approchez donc votre torche pour mieux voir. À la lumière, vous voyez que le mur est fait de branches entrelacées. Ces dernières, figées dans un premier temps, puis se mettent à bouger. Sans crier gare, ces dernières se détachent, pour se jeter sur vous. Dans la bataille vous lâchez votre torche. Avant de vous retrouver enseveli, vous vous évanouissez.",
        options: [{
            text: "Reprendre connaissance",
            nextText: '5-a-1-a'
        }]
    },
    {
        id: '5-a-1-a',
        text: "Vous revenez à vous au bout d’un certain temps, mais vous ignorez combien, mais vous avez l’impression d’être différent. D’abord vous essayez de bouger, mais n’y parvenez pas, comme si vous étiez paralysé. En ouvrant les yeux, vous voyez avec stupéfaction que vous faites face à une des statues de tout à l’heure, vous pensez même que c’est celle que vous avez observé. La raison est simple, vous êtes DANS une statue, vous comprenez alors avec horreur que ce sont des voyageurs, comme vous. Puis vous entendez des pas. Quelle n’est pas votre stupeur quand vous vous voyez entrer, et refaire exactement les mêmes choses que vous auparavant, sans exception...",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: '5-a-2',
        text: "Vous ressentez une sensation étrange dans cette salle, aussi vous vous dirigez vers le passage au fond. En arrivant, vous voyez un escalier. Vous voyez qu’il est fait en grosses branches, relativement glissantes à vue d’oeil. Arrivé en haut, en évitant quelques glissades, vous vous retrouvez dans une salle bien mieux éclairée que la précédente. Devant vous se dresse un trône taillé dans un chêne, assez grand pour recevoir soit plusieurs personnes, soit un géant. L’éclairage puissant du lieu vient du plafond, un trou assez grand étant juste au deçu du trône, de sorte que ça forme une zone lumineuse au centre de laquelle se trouve le siège. Vous ralentissez l’allure en arrivant dans la salle, puis vous vous arrêtez quelques instants au centre, comme si vous sentiez l’âme d’un roi parti depuis longtemps. Quelques minutes plus tard, vous reprenez votre route, et contournez le trône, vous voyez alors un passage situé juste derrière.",
        options: [{
            text: "Suivre le passage",
            nextText: '5-a-2-a'
        }]
    },
    {
        id: '5-a-2-a',
        text: "Vous suivez le passage. Avant même de le passer, vous y apercevez une lumière vive, serait-ce... En entrant, vos doutes se retrouvent confirmés. En effet, vous vous retrouvez dans la salle aux trésors du roi, si toutefois c’est bien un roi qui siègeait dans la salle précédente. Arrivé au centre de la salle, vous regardez tout autour, et voyez des monceaux d’or.",
        options: [{
            text: "Prendre une pièce d’or",
            nextText: '5-a-2-a-1'
        }]
    },
    {
        id: '5-a-2-a-1',
        text: "Voyant tout cet or, vous ne pouvez résister. Au moment où vous touchez la pièce dorée, un hallo de lumière émane d’elle, et vous sentez la fatigue vous envahir. Doucement, mais sûrement, vous vous endormez.",
        options: [{
            text: "Se réveiller",
            nextText: '5-a-2-a-1-a'
        }]
    },
    {
        id: '5-a-2-a-1-a',
        text: "Vous vous réveillez, ouvrez les yeux, et voyez que vous êtes dans votre lit. Peut être n’était ce qu’un rêve, mais au fond de vous, vous savez, vous sentez, que ça ne l’était pas. Vous sentez soudain quelque chose dans votre main. Là, vous voyez la pièce d’or. Malheureusement, à peine avez vous ouvert la main que la pièce s’effrite et tombe en poussière. Vous savez à présent que tout était vrai, vous n’avez maintenant plus qu’à y retourner pour le prouver.",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: 6,
        text: "Ne résistant pas à l'envie de vous aventurer plus en avant, pensant que votre briquet suffira amplement pour vous éclairer. Cependant, une fois arrivez de l'autre côté du passage, vous vous rendez vite compte que votre source de lumière est bien trop faible, vous n'arrivez pas à distinguer quoi que ce soit. Le silence étant tellement pesant, le noir tellement intense que vous avez l'impression qu'il vous avale tout entier, jusqu'à vous sentir paralysé. Avant de vous évanouir tant l'endroit est oppressant, le froid commençant à s'installer dû à l'épaisseur de la forêt en ce lieu, vous décidez de faire demi tour.",
        options: [{
            text: "Faire demi-tour",
            nextText: '6-a'
        }]
    },
    {
        id: '6-a',
        text: "Vous voilà de retour dans le sous-bois. Vous regardez le ciel et voyez que le temps s'est écoulé plus vite que prévu, le grognement de votre estomac aidant, vous estimez l'heure aux environs de celle du déjeuner. Cependant, malgré cette fatigue et cette faim se faisant de plus en plus ressentir, vous ne pouvez empêcher votre soif d'aventure de gronder en vous. Pour satisfaire votre curiosité, vous savez qu'il y a le bout de bois au sol devant le passage de gauche, il pourrait sûrement vous être utile. Sinon, il y a bien ce chemin à droite qui paraît vraiment agréable.",
        options: [{
                text: "Rentrer avant qu'il ne soit trop tard",
                nextText: '6-a-1'
            },
            {
                text: "Se laisser guider par vos sens et étancher votre curiosité en partant à droite",
                nextText: '6-a-2'
            },
            {
                text: "Se faire une torche avec le bâton et reprendre le chemin de gauche",
                nextText: '6-a-3'
            }
        ]
    },
    {
        id: '6-a-1',
        text: "Vous vous sentez de plus en plus faible après le passage dans l'obscurité profonde. Vous faites le sage choix de rentrer chez vous pour vous reposer, vous disant que vous pourrez toujours revenir un autre jour.",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: '6-a-2',
        text: "Vous décidez donc de suivre vos sens. Vous empruntez cette voie de droite. À mesure que vous vous approchez de la sortie du chemin, le chant des oiseaux ainsi que l'odeur des fleurs se font de plus en plus présents. Une fois sur place, vous vous retrouvez à l'orée d'une magnifique clairière. Cette dernière est extrêmement ensoleillée, seul un immense arbre et quelques formes longues se dessinent au loin. À vue d'œil, la place semble faire plusieurs kilomètres de diamètre, aussi grand voire plus que le parc de votre enfance vous vous dites. Devant la splendeur de ce lieu, vous fermez les yeux. Cependant, alors que vous les aviez oublié quelques instants, la faim ainsi que la fatigue refont surface. Aussi, sous le poids de tout ce qui vous est arrivé jusqu'à présent, et l'aura de ce lieu étant tellement apaisant, vous vous effondrez dans un bruit sourd. En tombant, vous apercevez un halo bleuté. Puis, dans un souffle, vous entendez ''Ne revenez pas...'', avant de vous faire aspirer par le chemin par lequel vous êtes venu. À peine quelques secondes après, vous perdez connaissance.",
        options: [{
            text: "Ouvrir les yeux",
            nextText: '6-a-2-a'
        }]
    },
    {
        id: '6-a-2-a',
        text: "Vous vous réveillez. Dans un premier temps, votre vue a du mal à revenir, puis petit à petit vous reconnaissez le lieu. Vous êtes... Au pied de l'arbre tordu en forme de ''S'' ! Vous vous demandez forcément comment vous avez pu arriver ici, les souvenirs sont incertains, puis vous vous souvenez de l'aspiration dont vous avez été victime. D'un coup, vous vous redressez, et après avoir attendu que votre tête ne tourne plus, vous regardez autour de vous. D'abord, vous vous rendez compte que la nuit est en train de tomber. Puis vous baissez votre regard et voyez une jeune femme à l’air plutôt amical dont il émane une sorte d’aura bleue.",
        options: [{
                text: "Lui parler",
                nextText: '6-a-2-a-1'
            },
            {
                text: "Repartir chez soi",
                nextText: '6-a-2-a-2'
            }
        ]
    },
    {
        id: '6-a-2-a-1',
        text: "Dans un premier temps, vous l’observez. Vous décidez alors de la saluer. Cette dernière vous regarde, puis vous rend votre salut. Ensuite, elle vous demande comment vous allez. En y réfléchissant, vous vous rendez compte que vous êtes relativement en forme, malgré ce qui vient de vous arriver. Puis, voyant que vous ne comptez pas partir, elle vous propose de la suivre. À ces mots, elle prend une grande inspiration. Au fur et à mesure que son inspiration grandit, l’émanation bleue se fait de plus en plus intense, tellement que vous devez fermer les yeux. En les ouvrant à nouveau, vous voyez devant vous une orbe bleue flotter à hauteur de vos yeux. Cette dernière part ensuite dans le passage pour le sous bois.",
        options: [{
            text: "Lui faire confiance et la suivre",
            nextText: '6-a-2-a-1-a'
        }]
    },
    {
        id: '6-a-2-a-1-a',
        text: "Vous sentant tout à fait en confiance, vous décidez de suivre la femme-aura. Cette dernière vous guide dans le sous bois, puis se dirige vers la salle sombre.",
        options: [{
                text: "Suivre votre guide",
                nextText: '6-a-2-a-1-a-1'
            },
            {
                text: "Rentrer chez soi",
                nextText: '6-a-2-a-1-a-2'
            }
        ]
    },
    {
        id: '6-a-2-a-1-a-1',
        text: "Étrangement, après tout ce qui vous est arrivé ici, vous pensiez ressentir de la peur, ou au moins de l’appréhension, mais pas du tout. Cette lumière possède une telle puissance d’appaisement, que vous la suivez sans crainte, même si derrière vous, vous pouvez entendre le chemin se refermer. Devant vous, la lueur s’arrête devant un passage étroit, et lorsque vous la rejoignez, s’y engage.",
        options: [{
            text: "Emprunter le passage étroit",
            nextText: '6-a-2-a-1-a-1-a'
        }]
    },
    {
        id: '6-a-2-a-1-a-1-a',
        text: "Vous arrivez dans une salle faiblement éclairée, uniquement par quelques torches accrochées ça et là. Vous en attrapez une. Vous observez autour de vous et voyez des sortes de troncs placés en deux rangées, de sorte que cela forme un couloir. En regardant de plus prêt, vous pouvez constater que les tronc ont été taillés et sculptés pour leur donner des apparances de statues. Il est seulement dommage qu’avec le peu de lumière que vous possédez vous ne puissiez en distinguer les détails, ces derniers ayant l’air extrèmement réalistes. Vous vous dites que c’est quand même étrange de trouver une pièce au beau milieu d’une forêt, vous décidez donc d’aller observer les murs. Vous voyant faire, votre guide s’interpose, et vous fait comprendre que vous devriez la suivre.",
        options: [{
                text: "Écouter la guide",
                nextText: '6-a-2-a-1-a-1-a-1'
            },
            {
                text: "Aller observer les murs",
                nextText: '6-a-2-a-1-a-1-a-2'
            }
        ]
    },
    {
        id: '6-a-2-a-1-a-1-a-1',
        text: "L’orbe vous guide assez rapidement vers un escalier, comme s’il n’y a pas de temps à perdre, ou qu’elle veut partir au plus vite. En arrivant au pied de l’escalier, vous voyez qu’il est fait en grosses branches, relativement glissantes à vue d’oeil. Arrivés en haut, en évitant quelques glissades, vous vous retrouvez dans une salle bien mieux éclairée que la précédente. Devant vous se dresse un trône taillé dans un chêne, assez grand pour recevoir soit plusieurs personnes, soit un géant. L’éclairage puissant du lieu vient du plafond, un trou assez grand étant juste au deçu du trône, de sorte que ça forme une zone lumineuse au centre de laquelle se trouve le siège. Curieusement, l’aura ralentit son allure en arrivant dans la salle, puis s’arrête au centre, comme si elle faisait une révérence à un roi parti depuis longtemps. Quelques minutes plus tard, la petite boule lumineuse reprend sa route sans se hâter, vers un passage situé juste derrière le trône.",
        options: [{
            text: "Suivre l’orbe",
            nextText: '6-a-2-a-1-a-1-a-1-a'
        }]
    },
    {
        id: '6-a-2-a-1-a-1-a-1-a',
        text: "Vous suivez à nouveau l’orbe lumineuse dans ce passage. Avant même de le passer, vous y apercevez une lumière vive, serait-ce... En entrant, vos doutes se retrouvent confirmés. En effet, vous vous retrouvez dans la salle aux trésors du roi, si toutefois c’est bien un roi qui siègeait dans la salle précédente. Arrivée au centre de la salle, l’orbe bleue s’arrête, reprend sa forme humaine, et vous tend la main, comme pour vous inviter à la prendre. Mais tout autour, vous voyez des monceaux d’or.",
        options: [{
                text: "Attraper la main",
                nextText: '6-a-2-a-1-a-1-a-1-a-1'
            },
            {
                text: "Prendre une pièce d’or",
                nextText: '6-a-2-a-1-a-1-a-1-a-2'
            }
        ]
    },
    {
        id: '6-a-2-a-1-a-1-a-1-a-1',
        text: "Malgré tout l’or, tous les bijoux, vous prenez la main de votre guide. Au moment où vous la touchez, un hallo de lumière émane d’elle, et vous sentez la fatigue vous envahir. Doucement, mais sûrement, vous vous endormez.",
        options: [{
            text: "Se réveiller",
            nextText: '6-a-2-a-1-a-1-a-1-a-1-a'
        }]
    },
    {
        id: '6-a-2-a-1-a-1-a-1-a-1-a',
        text: "Vous vous réveillez, ouvrez les yeux, et voyez que vous êtes dans votre lit. Peut être n’était ce qu’un rêve, mais au fond de vous, vous savez, vous sentez, que ça ne l’était pas. Vous ressentez encore sa main dans la votre. Vous n’avez qu’une envie, c’est vérifier que tout ça existe bel et bien.",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: '6-a-2-a-1-a-1-a-1-a-2',
        text: "Malgré tout le respect que vous avez pour votre guide, vous préférez prendre de l’or. Au moment où vous touchez la pièce dorée, un hallo de lumière émane d’elle, et vous sentez la fatigue vous envahir. Doucement, mais sûrement, vous vous endormez.",
        options: [{
            text: "Se réveiller",
            nextText: '5-a-2-a-1-a'
        }]
    },
    {
        id: '6-a-2-a-1-a-1-a-2',
        text: "Vous dites à votre guide que vous la suivrait après, mais que vous souhaitez vraiment voir les murs de cette salle insoupsonnée. L’aura tente malgré tout de s’interposer à nouveau.",
        options: [{
                text: "Insister",
                nextText: '6-a-2-a-1-a-1-a-2-a'
            },
            {
                text: "Écouter l’aura",
                nextText: '6-a-2-a-1-a-1-a-2-b'
            }
        ]
    },
    {
        id: '6-a-2-a-1-a-1-a-2-a',
        text: "D’un coup de main, vous chassez l’orbe lumineux. Vous empoignez votre torche et vous dirigez vers le mur qui vous fait face. Tout d’abord, vous pensez voir un mur en pierre, comme on trouve dans les château, mais distinguez une sorte de suintement. Vous approchez donc votre torche pour mieux voir. À la lumière, vous voyez que le mur est fait de branches entrelacées. Ces dernières, figées dans un premier temps, puis se mettent à bouger. Sans crier gare, ces dernières se détachent, pour se jeter sur vous. Dans la bataille vous lâchez votre torche. Avant de vous retrouver enseveli, vous avez juste le temps de voir l’orbe essayer de vous libérer, en vain. Vous vous évanouissez.",
        options: [{
            text: "Reprendre connaissance",
            nextText: '6-a-2-a-1-a-1-a-2-a-1'
        }]
    },
    {
        id: '6-a-2-a-1-a-1-a-2-a-1',
        text: "Vous revenez à vous au bout d’un certain temps, mais vous ignorez combien, mais vous avez l’impression d’être différent. D’abord vous essayez de bouger, mais n’y parvenez pas, comme si vous étiez paralysé. En ouvrant les yeux, vous voyez avec stupéfaction que vous faites face à une des statues de tout à l’heure, vous pensez même que c’est celle que vous avez observé. La raison est simple, vous êtes DANS une statue, vous comprenez alors avec horreur que ce sont des voyageurs, comme vous. Puis vous entendez des pas, et voyez l’orbe arriver dans la salle. Quelle n’est pas votre stupeur quand vous vous voyez entrer, et refaire exactement les mêmes choses que vous auparavant, sans exception...",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: '6-a-2-a-1-a-1-a-2-b',
        text: "Devant une telle insistance, vous vous dites qu’il vaut peut être mieux écouter votre guide. L’orbe vous emmène alors assez rapidement vers un escalier, comme s’il n’y avait pas de temps à perdre, ou qu’elle voulait partir au plus vite. En arrivant au pied de l’escalier, vous voyez qu’il est fait en grosses branches, relativement glissantes à vue d’oeil. Arrivés en haut, en évitant quelques glissades, vous vous retrouvez dans une salle bien mieux éclairée que la précédente. Devant vous se dresse un trône taillé dans un chêne, assez grand pour recevoir soit plusieurs personnes, soit un géant. L’éclairage puissant du lieu vient du plafond, un trou assez grand étant juste au deçu du trône, de sorte que ça forme une zone lumineuse au centre de laquelle se trouve le siège. Curieusement, l’aura ralentit son allure en arrivant dans la salle, puis s’arrête au centre, comme si elle faisait une révérence à un roi parti depuis longtemps. Quelques minutes plus tard, la petite boule lumineuse reprend sa route, vers un passage situé juste derrière le trône.",
        options: [{
            text: "Passer par le passage",
            nextText: '6-a-2-a-1-a-1-a-1-a'
        }]
    },
    {
        id: '6-a-2-a-1-a-2',
        text: "Malgré toute la confiance que vous pouvez avoir en elle, retourner dans ce chemin est vraiment trop vous demander. Vous préférez rentrer chez vous.",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: '6-a-2-a-2',
        text: "Ayant eu votre dose d’aventure et d’émotion, vous préférez rentrer chez vous, et laisser les auras étranges à d’autres.",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: '6-a-3',
        text: "Vous vous fabriquez une torche tant bien que mal avec le bâton au sol et le mouchoir dans votre poche. Vos mains sont tremblantes, vous vous sentez de plus en plus épuisé. Vous allumez votre torche de fortune à l'aide de votre briquet. Ce dernier, n'ayant plus de gaz, s'éteint. Vous reprenez le chemin vers le lieu qui vous a tant effrayé auparavant. Une fois arrivé sur place, votre vue commence à vous faire défaut. En effet, vous croyez apercevoir une personne, mais votre vision devient trouble, vous n'avez plus d'énergie, vous tombez donc au sol dans un bruit sourd. Avant de vous évanouir, vous pouvez voir la silhouette se diriger vers vous pour vous attraper et vous porter sur son dos.",
        options: [{
            text: "Se laisser porter par la silhouette",
            nextText: '6-a-3-a'
        }]
    },
    {
        id: '6-a-3-a',
        text: "Vous vous réveillez. Dans un premier temps, votre vue a du mal à revenir, puis petit à petit vous reconnaissez le lieu. Vous êtes... Chez vous, qui plus est dans votre lit ! Vous vous demandez forcément comment vous avez pu revenir chez vous, les souvenirs sont incertains, puis vous vous souvenez de la silhouette. D'un coup, vous vous redressez, et après avoir attendu que votre tête ne tourne plus, vous faites quelques pas. En avancement pour aller dans votre salon, vous avez l’impression que votre mur n’est pas comme à son habitude, comme s’il dégageait quelque chose de… différent… Vous n’y prêtez guère attention et vous dirigez vers votre salon. De là vous voyez un homme à la forte ossature.",
        options: [{
                text: "Appeler la police",
                nextText: '6-a-3-a-1'
            },
            {
                text: "Lui parler",
                nextText: '6-a-3-a-2'
            }
        ]
    },
    {
        id: '6-a-3-a-1',
        text: "Ni une, ni deux, vous foncez vers votre téléphone, et avant que l’intru ait le temps de dire “ ouf ”, vous attrapez le combinet. Au contact de votre peau, l’appareil se met à émettre des vibrations de plus en plus intenses, tant et si bien que vous n’avez d’autres choix que de le lâcher. En tombant au sol, ce dernier explose, provoquant un cri strident de l’individu. Ce dernier, sous le choc, se met à émettre une forte lumière rouge, tellement puissante que vous n’avez d’autre choix de fermer les yeux.",
        options: [{
            text: "Regarder ce qu’il se passe",
            nextText: '6-a-3-a-1-a'
        }]
    },
    {
        id: '6-a-3-a-1-a',
        text: "Au travers de vos paupières fermées, vous pouvez voir que la lumière s’estompe, vous décidez donc d’ouvrir les yeux. Mais vous ne pouvez croire ce que vous voyez. En effet, vous voyez que vous n’êtes pas chez vous, mais toujours dans le sous bois. Au sol, gisent encore les morceaux du téléphone. Ce n’était donc qu’une illusion depuis le début… Depuis quand êtes vous retenu ici ? Mais plus important encore, qui est l’homme qui se tenait là ? Mais surtout, où est il ? En effet, à la place de l’autre personne se trouve une orbe rouge flottant à hauteur de vos yeux. Mais à peine avez vous eu le temps de la regarder que cette dernière s’échappe par le chemin de droite. En face de vous se trouve le chemin vous permettant de rentrer chez vous.",
        options: [{
                text: "Trop d’émotion pour aujourd’hui, rentrer à la maison",
                nextText: '6-a-2-a-2'
            },
            {
                text: "Suivre l’aura rouge malgré ce qui vient de se passer",
                nextText: '6-a-3-a-1-a-1'
            }
        ]
    },
    {
        id: '6-a-3-a-1-a-1',
        text: "Bien décidé à en savoir plus sur cette chose, vous vous mettez à sa poursuite. Vous avez du mal à le suivre, il va vite, aussi vous accélérez le pas. D’un coup, vous ne le voyez plus du tout, ni même sa lueur rouge, mais elle est remplacée par une lumière jaune, chaude, et des senteurs qui semblent venir tout droit d’un magasin de friandises, tant elles sont sucrées et fruitées. Vos sens étant dans tous leurs états, vous vous stoppez net. Vous vous retrouvez à l'orée d'une magnifique clairière. Cette dernière est extrêmement ensoleillée, seul un immense arbre et quelques formes longues se dessinent au loin. Ce que vous voyez devant vous vous submerge, tout semble si doux et calme ici. Mais vous n’avez que peu de temps pour apprécier la vue, car vous pouvez voir l’orbe rouge plus loin, se dirigeant vers l’arbre.",
        options: [{
                text: "Continuer la poursuite",
                nextText: '6-a-3-a-1-a-1-a'
            },
            {
                text: "Faire demi tour et rentrer chez soi",
                nextText: '6-a-3-a-1-a-1-b'
            }
        ]
    },
    {
        id: '6-a-3-a-1-a-1-a',
        text: "Ah ça non ! Il ne s’échappera pas comme ça, vous comptez bien obtenir vos explications ! Vous vous mettez à courir pour rattraper l’orbe qui s’éloigne de plus en plus. Plus vous accélérez, plus vous avez l’impression que l’aura vous distance. Vous courez de plus en plus vite, jusqu’à perdre haleine, et vous arrivez cependant à rejoindre la lumière rouge au niveau des formes longues que vous voyiez au loin. En arrivant, vous vous apercevez qu’il s’agit en fait d’un cercle de pierres, un chêne majestueux en son centre, ses feuilles produisant une sorte de lumière bleue. Les stèles, d’au moins 2 mètres de haut, sont disposées à un mètre les unes des autres. L’arbre, quant à lui, dépasse bien largement ces dalles qui paraissent bien ridicules à côté. Ne voyant plus l’aura, vous la cherchez, et la voyez en fait devant vous. Au moment où vos yeux se posent dessus, cette dernière entre dans l’arbre. Interloqué, vous vous avancez.",
        options: [{
            text: "Toucher l’arbre",
            nextText: '6-a-3-a-1-a-1-a-1'
        }]
    },
    {
        id: '6-a-3-a-1-a-1-a-1',
        text: "Vous vous approchez doucement de l’arbre, ce qui vient de se passer vous semble tout de même très suspect. Tout d’abord, vous tendez l’oreille. En vous concentrant, vous avez la curieuse impression que l’arbre respire, et même qu’il parle. Mais pas d’une seule voix, vous entendez plusieurs type de murmure, comme une assemblée discutant le plus silencieusement possible. Vous avez l’impression que le chêne essaie de communiquer avec vous, ou une chose à l’intérieur. Aussi, vous vous penchez vers le tronc, tellement que vous n’avez d’autre choix que de vous soutenir avec vos mains. Au contact de votre peau, vous sentez l’écorce d’adoucir, comme si elle s’étalait sous vos mains. Ce qui vous provoque un mouvement de recul. Cependant, vos mains restent collées, la sève coulant entre vos doigts, puis se solidifiant très rapidement. De là, vous sentez votre énergie s’échapper de votre corps. Vous vous évanouissez.",
        options: [{
            text: "Reprendre connaissance",
            nextText: '6-a-3-a-1-a-1-a-1-a'
        }]
    },
    {
        id: '6-a-3-a-1-a-1-a-1-a',
        text: "Au bout d’un certain temps, vous n’avez absolument aucune idée de combien, vous reprenez connaissance. Tout d’abord, vous essayez d’ouvrir les yeux mais rien n’y fait, impossible. Puis, vous entendez des chuchottements, les mêmes que ceux de l’arbre. En vous concentrant, et en y mettant toutes vos forces, vous arrivez à regagner votre vue. Ce que vous voyez vous laisse perplexe, et sans voix, puisque cette dernière semble avoir totalement disparue. En effet, vous voyez comme si vous étiez dans l’arbre, et plus précisément à la place d’une feuille. Au loin, vous visualisez une personne s’écrouler au sol, une aura bleue l’attrapant et l’emmenant dans le chemin qui va au sous bois. Vous essayez de vous débattre, mais vue la hauteur, et la fragilité de votre maintien, vous craigniez une chute. Ce faisant, vous abandonnez toute tentative de vous échapper.",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: '6-a-3-a-1-a-1-b',
        text: "Malgré l’ivresse du lieu, cela n’augure rien de bon. Vous vous souvenez de Hansel et Gretel, de leur histoire, mais surtout de la fin qui leur est réservée. Ne vous faisant aucunement prier, vous faites demi tour et rentrez chez vous.",
        options: [{
            text: "Recommencer",
            nextText: -1
        }]
    },
    {
        id: '6-a-3-a-2',
        text: "Dans un premier temps, vous l’observez. N’ayant pas l’air bien méchant, vous le saluez. Ce dernier, sous le choc, se met à émettre une forte lumière rouge, tellement puissante que vous n’avez d’autre choix de fermer les yeux.",
        options: [{
            text: "Regarder ce qu’il se passe",
            nextText: '6-a-3-a-1-a'
        }]
    }
]

startGame();