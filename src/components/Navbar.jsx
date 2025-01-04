import React from 'react';
import './NavBar.css'; 

const NavBar = () => {
  return (
    <nav className="navbar">
    <div className="logo">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 512 512">
         <path d="M0 0 C1.27230469 1.04414062 1.27230469 1.04414062 2.5703125 2.109375 C19.96546892 17.05066923 32.49258318 36.92149402 38.8125 58.9375 C39.00739014 59.60354248 39.20228027 60.26958496 39.40307617 60.95581055 C42.71650123 73.34647235 43.35511639 86.21470239 43.31567383 98.9765625 C43.31244928 101.15933453 43.33633823 103.34082527 43.36132812 105.5234375 C43.36359626 106.93489416 43.36430688 108.34635439 43.36328125 109.7578125 C43.36775269 111.63170654 43.36775269 111.63170654 43.37231445 113.54345703 C42.79656534 118.88867406 41.15782592 121.87013579 37.32104492 125.61425781 C33.77424495 128.34937301 29.89861628 130.26377607 25.86328125 132.171875 C25.10202438 132.53976135 24.34076752 132.90764771 23.55644226 133.28668213 C21.14554384 134.44911465 18.72909682 135.59946932 16.3125 136.75 C14.6786797 137.53702023 13.04521248 138.32477388 11.41210938 139.11328125 C-7.10257604 148.02023235 -7.10257604 148.02023235 -15.64550781 145.09375 C-18.52178263 143.81312532 -21.32334413 142.43648793 -24.125 141 C-25.12966309 140.49960205 -26.13432617 139.9992041 -27.16943359 139.48364258 C-29.18375212 138.47519312 -31.19380089 137.45816429 -33.19921875 136.43212891 C-35.67495867 135.16620401 -38.16204116 133.92817747 -40.65625 132.69921875 C-47.60789043 129.18965271 -53.38191105 126.23617791 -57 119 C-57.10737647 116.77004382 -57.15557612 114.53713594 -57.17578125 112.3046875 C-57.19900165 110.93488084 -57.22311985 109.56508916 -57.24804688 108.1953125 C-57.28297643 106.04287008 -57.31239963 103.8909709 -57.32592773 101.73828125 C-57.24305071 89.08999381 -57.24305071 89.08999381 -63.48193359 78.46069336 C-68.3169531 74.18356072 -72.30214192 73.69897735 -78.5 73.7890625 C-83.61363379 74.22052535 -86.27418562 76.24119406 -89.75 79.875 C-93.37730542 84.9129242 -94.24982749 88.5916734 -94.25828552 94.78215027 C-94.26196123 95.4515919 -94.26563693 96.12103353 -94.26942402 96.81076127 C-94.2793798 99.04734028 -94.27525789 101.28366945 -94.27124023 103.52026367 C-94.27562916 105.12724572 -94.28093192 106.7342255 -94.28707886 108.34120178 C-94.2985748 111.80114825 -94.30403805 115.26103351 -94.30496025 118.72099876 C-94.30690568 124.20820517 -94.32498942 129.69528605 -94.34571838 135.18244934 C-94.39486141 148.82299344 -94.42567979 162.46357193 -94.44702148 176.10418701 C-94.46361064 186.6862803 -94.48663843 197.26826637 -94.53004223 207.85028821 C-94.55163941 213.28707271 -94.55989309 218.72365269 -94.55764949 224.16047704 C-94.55933624 227.57133985 -94.57350699 230.9820734 -94.59086227 234.39288902 C-94.59638349 235.95434107 -94.59702107 237.51582083 -94.59192467 239.07727432 C-94.49127498 273.58055907 -106.72456252 303.41333897 -131 328 C-153.07843784 350.11393373 -183.14399548 361.0126774 -214.0625 361.25 C-243.60294198 361.07765527 -269.4938421 350.85549349 -292 332 C-292.68835938 331.44699219 -293.37671875 330.89398438 -294.0859375 330.32421875 C-315.15810942 312.87512777 -328.31007663 284.67837445 -332 258 C-332.50062989 252.19884043 -332.44819282 246.37669167 -332.43359375 240.55859375 C-332.43816942 238.93530563 -332.44347903 237.31201944 -332.44947815 235.68873596 C-332.45832629 232.31967183 -332.45607578 228.95084591 -332.44604492 225.58178711 C-332.43446589 221.27449017 -332.45494368 216.96800228 -332.48396206 212.66081142 C-332.5023193 209.32270655 -332.50203429 205.98479681 -332.49632454 202.64665413 C-332.4961718 201.05789096 -332.50217713 199.46911418 -332.51461601 197.8803997 C-332.52954568 195.66510763 -332.51884306 193.45132957 -332.50170898 191.23608398 C-332.50145973 189.35203102 -332.50145973 189.35203102 -332.50120544 187.42991638 C-331.90512921 183.35076747 -330.55413687 181.19857236 -328 178 C-322.74209701 174.18802033 -318.34928497 173.87332664 -311.95581055 173.83886719 C-311.25445984 173.83390228 -310.55310913 173.82893738 -309.83050537 173.82382202 C-307.51589975 173.80924676 -305.20136268 173.802406 -302.88671875 173.796875 C-301.27252705 173.79111952 -299.65833536 173.78536184 -298.04414368 173.77960205 C-294.66069217 173.76910511 -291.27726432 173.76325397 -287.89379883 173.75976562 C-283.56963619 173.75428506 -279.24578907 173.73026104 -274.92172527 173.70179367 C-271.58703208 173.68312044 -268.25241416 173.67795919 -264.91767311 173.67642975 C-263.32414844 173.67341302 -261.73062479 173.66541773 -260.13715172 173.65224457 C-257.90198501 173.63508613 -255.66757987 173.63708774 -253.43237305 173.64355469 C-251.52853096 173.63808624 -251.52853096 173.63808624 -249.58622742 173.63250732 C-242.93976053 174.31359294 -238.37839127 176.84895144 -234 182 C-232.95709362 185.12871914 -232.85703127 187.36136169 -232.82641602 190.64550781 C-232.81292618 191.80391174 -232.79943634 192.96231567 -232.78553772 194.15582275 C-232.76988014 196.03548737 -232.76988014 196.03548737 -232.75390625 197.953125 C-232.72939963 199.92236483 -232.70488176 201.8916046 -232.67970943 203.86083603 C-232.61902962 208.71687003 -232.56839641 213.57299849 -232.52319336 218.42919922 C-232.49746105 221.15249278 -232.46660697 223.87564153 -232.43040466 226.59881592 C-232.39670491 229.16191461 -232.37073207 231.72512943 -232.35340881 234.28839111 C-232.22137886 243.57866611 -231.88651597 250.11348403 -225 257 C-219.95441037 260.52017881 -214.95583961 260.81800883 -209 260 C-204.33023142 258.5846763 -201.61085602 256.76748577 -198.5625 252.9375 C-196.2322527 248.55663508 -195.87129725 245.46763526 -195.85523987 240.55879211 C-195.8499496 239.57345223 -195.8499496 239.57345223 -195.84455246 238.56820649 C-195.8338603 236.36227704 -195.83018339 234.15639079 -195.82641602 231.95043945 C-195.82011048 230.37006447 -195.81334467 228.78969126 -195.80615234 227.20932007 C-195.79147284 223.80119001 -195.77975127 220.39306685 -195.77020454 216.98491859 C-195.75473482 211.58245781 -195.73078022 206.18005533 -195.70530701 200.77763367 C-195.63416806 185.41290994 -195.57456751 170.04815163 -195.52319336 154.68334961 C-195.4947554 146.20078637 -195.45929393 137.71828001 -195.41653961 129.2357766 C-195.3899647 123.88044444 -195.37193783 118.5251766 -195.36050236 113.16979182 C-195.35127931 109.81257968 -195.33387215 106.45544443 -195.31432343 103.09827805 C-195.30694238 101.5585662 -195.30277269 100.01883447 -195.30232811 98.479105 C-195.29545187 85.28545342 -194.60907448 71.94089161 -190.9375 59.1875 C-190.62268677 58.08583496 -190.62268677 58.08583496 -190.30151367 56.96191406 C-181.13988911 26.73206811 -160.10666046 1.82925804 -132.49609375 -13.22265625 C-89.25039371 -35.2079004 -37.61388721 -31.18136737 0 0 Z " fill="#000000" transform="translate(332,89)"/>
         <path d="M0 0 C4.06432707 1.9225048 6.23682241 4.64887551 8.16821289 8.73583984 C9.74879761 13.87927644 9.50898619 19.23794568 9.46583557 24.57208252 C9.44841016 26.79327034 9.45616718 29.0131753 9.47009277 31.234375 C9.49957678 36.74706101 9.48657619 42.25949269 9.47491455 47.7722168 C9.46668012 52.44221162 9.47476601 57.11164042 9.50404358 61.78155518 C9.51108537 63.95760378 9.49453125 66.13262628 9.47692871 68.30859375 C9.47809868 75.64987225 9.7848843 81.18522177 13.97998047 87.37744141 C19.30364691 91.61464531 23.67722947 92.78744361 30.33935547 92.72900391 C35.53497798 92.03727902 39.22894853 89.12847334 42.85498047 85.50244141 C46.65731757 78.3202491 46.25983968 70.97196241 46.25341797 63.03369141 C46.26851405 61.07313936 46.28363331 59.11258718 46.30010414 57.1520462 C46.33772954 52.34425514 46.35503231 47.53644224 46.36083984 42.72851562 C46.36489534 40.02191197 46.37950787 37.31573737 46.40518188 34.60925293 C46.4285353 32.06841687 46.4360307 29.52737229 46.42562866 26.9864502 C46.50275347 20.25217213 46.84298598 15.80207187 50.97998047 10.37744141 C56.14366965 6.50467452 60.69445583 6.2504244 67.02416992 6.21630859 C67.72552063 6.21134369 68.42687134 6.20637878 69.1494751 6.20126343 C71.46408072 6.18668816 73.77861779 6.17984741 76.09326172 6.17431641 C77.70745342 6.16856093 79.32164511 6.16280325 80.93583679 6.15704346 C84.3192883 6.14654651 87.70271615 6.14069537 91.08618164 6.13720703 C95.41034428 6.13172647 99.73419139 6.10770245 104.0582552 6.07923508 C107.39294839 6.06056184 110.7275663 6.0554006 114.06230736 6.05387115 C115.65583203 6.05085443 117.24935568 6.04285914 118.84282875 6.02968597 C121.07799546 6.01252753 123.3124006 6.01452915 125.54760742 6.02099609 C127.45144951 6.01552765 127.45144951 6.01552765 129.39375305 6.00994873 C136.08316401 6.69543497 140.51895981 9.2603883 144.97998047 14.37744141 C146.43420007 17.28588061 146.13145348 19.84692935 146.15698242 23.09594727 C146.16355362 23.78748398 146.17012482 24.47902069 146.17689514 25.19151306 C146.19667342 27.49177162 146.20831451 29.79196402 146.21826172 32.09228516 C146.22233725 32.88314577 146.22641277 33.67400639 146.2306118 34.48883247 C146.25151381 38.69282902 146.26578504 42.89679275 146.27514648 47.10083008 C146.28392965 50.54665229 146.30461207 53.99206108 146.33666992 57.43774414 C146.67266627 94.36063917 146.67266627 94.36063917 141.97998047 109.37744141 C141.67713135 110.3794458 141.37428223 111.3814502 141.06225586 112.41381836 C140.2547287 114.85269066 139.35496535 117.19944736 138.35498047 119.56494141 C138.016521 120.38462402 137.67806152 121.20430664 137.3293457 122.04882812 C132.34732975 133.67540933 125.77616021 144.13528422 116.98779297 153.26416016 C114.91514173 155.37544821 114.91514173 155.37544821 113.04248047 157.87353516 C109.31341698 162.40067474 104.59307085 165.79223425 99.97998047 169.37744141 C98.80242187 170.29589844 98.80242187 170.29589844 97.60107422 171.23291016 C72.70761036 189.6397523 40.47971184 196.79129216 9.9987793 192.6081543 C-16.30827329 188.36677158 -37.70422793 176.50717563 -57.02001953 158.37744141 C-57.90560547 157.6059375 -57.90560547 157.6059375 -58.80908203 156.81884766 C-78.79114943 138.58876247 -89.99383011 108.4216608 -91.30023193 81.92810059 C-91.44354679 77.42671938 -91.43853262 72.92744883 -91.41845703 68.42431641 C-91.42048618 66.78289664 -91.42340453 65.14147777 -91.42715454 63.50006104 C-91.43152351 60.10183923 -91.42531536 56.70385751 -91.41113281 53.30566406 C-91.39387847 48.96157568 -91.40401769 44.61803697 -91.4218502 40.27396774 C-91.43269672 36.90242367 -91.42924056 33.53101 -91.42146683 30.15946198 C-91.41947569 28.55675438 -91.42188564 26.9540347 -91.42890549 25.35134125 C-91.43655291 23.11981198 -91.42487836 20.88917762 -91.40820312 18.65771484 C-91.40581635 17.39296326 -91.40342957 16.12821167 -91.40097046 14.82513428 C-90.83803701 9.73045807 -89.25333217 6.49043086 -85.45751953 3.06494141 C-80.44335624 -0.40640241 -76.00908225 -0.45354668 -70.02001953 0.37744141 C-65.20981158 2.18769685 -60.7216016 4.56085462 -56.20751953 7.00244141 C-53.8574759 8.26860814 -51.49831272 9.50466376 -49.12548828 10.72900391 C-48.09576904 11.28410645 -47.0660498 11.83920898 -46.00512695 12.41113281 C-41.30369865 13.93303133 -38.48968805 12.07050346 -34.20263672 10.04882812 C-33.2503418 9.55656738 -32.29804688 9.06430664 -31.31689453 8.55712891 C-29.72167969 7.7546875 -29.72167969 7.7546875 -28.09423828 6.93603516 C-25.88734324 5.81832451 -23.68669729 4.68818417 -21.49267578 3.54541016 C-14.32263278 -0.02663781 -7.94386654 -2.44825473 0 0 Z " fill="#000000" transform="translate(366.02001953125,256.62255859375)"/>
        </svg>
      </div>

      {/* Navigation Links */}
      <ul className="nav-list">
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/jpeg" className="nav-link">JPEG</a>
        </li>
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/png" className="nav-link">PNG</a>
        </li>
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/gif" className="nav-link">GIF</a>
        </li>
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/tiff" className="nav-link">TIFF</a>
        </li>
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/psd" className="nav-link">PSD</a>
        </li>
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/pdf" className="nav-link">PDF</a>
        </li>
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/eps" className="nav-link">EPS</a>
        </li>
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/ai" className="nav-link">AI</a>
        </li>
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/indd" className="nav-link">INDD</a>
        </li>
        <li className="nav-item">
          <a href="https://addy1811.github.io/Sketchify/raw" className="nav-link">RAW</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;