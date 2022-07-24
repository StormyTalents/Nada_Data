import { User } from '../interfaces/User';

export interface CreateCertificationDto {
  name: string;
}

export interface Certification {
  id: number;
  name: string;
  code: string;
  fullName: string;
  description?: string;
  friendlyNames?: string[];
  type?: string;
  logoUrl: string;
  link?: string;
  isHavenOpp?: boolean;
  textColor?: string;
  bgColor?: string;
  certDetailUrl?: string;
  certBoardUrl?: string;
  approvingBody?: string;

  createdBy: User;
  created: Date;
  modifiedBy: User;
  modified: Date;
}

export const getCertificationClass = (name: string) => {
  switch (name) {
    case 'DBE':
      return 'bg-pink-500 text-white';
    case 'DVBE':
      return 'bg-blue-500 text-white';
    case 'WOSB':
      return 'bg-red-600 text-white';
    case 'WBE':
      return 'bg-yellow-600 text-white';
    default:
      return 'bg-purple-600 text-white';
  }
};

export const getCertificationColor = (name: any): object => {
  switch (name) {
    case 'DBE':
      return { backgroundColor: '#cfdfff', color: 'black' };
    case 'ACDBE':
      return { backgroundColor: '#cff0fc', color: 'black' };
    case 'MBE':
      return { backgroundColor: '#c2f6e9', color: 'black' };
    case 'SMBE':
      return { backgroundColor: '#d1f7c4', color: 'black' };
    case 'WBE':
      return { backgroundColor: '#ffeab6', color: 'black' };
    case 'WOSB':
      return { backgroundColor: '#fee3d6', color: 'black' };
    case 'WOSB Set-Aside':
      return { backgroundColor: '#ffdce5', color: 'black' };
    case 'WOSB Sole Source':
      return { backgroundColor: '#ffdaf6', color: 'black' };
    case 'EDWOSB Set Aside':
      return { backgroundColor: '#ede2ff', color: 'black' };
    case 'EDWOSB Sole Source':
      return { backgroundColor: '#eeeeee', color: 'black' };
    case 'DOBE':
      return { backgroundColor: '#9dc8ff', color: 'black' };
    case 'SDVOSB':
      return { backgroundColor: '#d0f0fc', color: 'black' };
    case 'SDVOSB Set-Aside':
      return { backgroundColor: '#78d1f3', color: 'black' };
    case 'SDVOSB Sole Source':
      return { backgroundColor: '#71ddc3', color: 'black' };
    case 'DVBE':
      return { backgroundColor: '#93e088', color: 'black' };
    case 'VOSB Set-Aside':
      return { backgroundColor: '#ffd66e', color: 'black' };
    case 'VOSB Sole Source':
      return { backgroundColor: '#ffa981', color: 'black' };
    case 'VOB':
      return { backgroundColor: '#ff9db7', color: 'black' };
    case '8(a) Set-Aside':
      return { backgroundColor: '#f99ce1', color: 'black' };
    case '8(a) Sole Source':
      return { backgroundColor: '#c8b1fa', color: 'black' };
    case 'HUBZone Set-Aside':
      return { backgroundColor: '#cccccc', color: 'black' };
    case 'HUBZone Sole Source':
      return { backgroundColor: '#457df1', color: 'white' };
    case 'LGBTBE':
      return { backgroundColor: '#59bcf9', color: 'white' };
    case 'IEE Set-Aside':
      return { backgroundColor: '#67d6d1', color: 'white' };
    case 'ISBEE Set-Aside':
      return { backgroundColor: '#5fc64c', color: 'white' };
    case 'Buy Indian Set-Aside':
      return { backgroundColor: '#f1b73f', color: 'white' };
    case 'LBE':
      return { backgroundColor: '#ed7840', color: 'white' };
    case 'Local Area Set-Aside':
      return { backgroundColor: '#e44263', color: 'white' };
    case 'SBE':
      return { backgroundColor: '#666666', color: 'white' };
    case 'SB-MB':
      return { backgroundColor: '#ea35bd', color: 'white' };
    case 'SB-PW':
      return { backgroundColor: '#824af6', color: 'white' };
    case 'SB':
      return { backgroundColor: '#489e9a', color: 'white' };
    case 'Total Small Business Set-Aside (FAR 19.5)':
      return { backgroundColor: '#314fa8', color: 'white' };
    case 'Partial Small Business Set-Aside':
      return { backgroundColor: '#3474b2', color: 'white' };
    case 'NVSA':
      return { backgroundColor: '#4c882d', color: 'white' };
    case 'NP':
      return { backgroundColor: '#ae7829', color: 'white' };
    default:
      return { backgroundColor: '#c75734', color: 'white' };
  }
};

export const getFriendlyCertificationColor = (name: any): object => {
  switch (name) {
    case 'DBE':
      return { backgroundColor: '#f1b73f', color: 'white' };
    case 'Minority':
      return { backgroundColor: '#824af6', color: 'white' };
    case 'Women':
      return { backgroundColor: '#e44263', color: 'white' };
    case 'Disability':
      return { backgroundColor: '#a5c6fa', color: 'black' };
    case 'Veteran':
      return { backgroundColor: '#ed7840', color: 'white' };
    case '8(a)':
      return { backgroundColor: '#67d6d1', color: 'white' };
    case 'HUBZone':
      return { backgroundColor: '#5fc64c', color: 'white' };
    case 'LGBTQ+':
      return { backgroundColor: '#a32987', color: 'white' };
    case 'Indian Economic Enterprise':
      return { backgroundColor: '#ea35bd', color: 'black' };
    case 'Local':
      return { backgroundColor: '#8dcfef', color: 'black' };
    case 'Small Business':
      return { backgroundColor: '#457df1', color: 'white' };
    default:
      return { backgroundColor: '#cccccc', color: 'black' };
  }
};

export const getFriendlyCertificationColorRevised = (name: any): object => {
  switch (name) {
    case 'DBE':
      return {
        backgroundColor: '#ffe7ad',
        color: '#936e18',
        fontWeight: 'bold',
      };
    case 'Minority':
      return {
        backgroundColor: '#f9f5ff',
        color: '#9470de',
        fontWeight: 'bold',
      };
    case 'Women':
      return {
        backgroundColor: '#ffeeee',
        color: '#a82116',
        fontWeight: 'bold',
      };
    case 'Disability':
      return {
        backgroundColor: '#ecfdf3',
        color: '#027143',
        fontWeight: 'bold',
      };
    case 'Veteran':
      return {
        backgroundColor: '#ed4a12',
        color: '#fff',
        fontWeight: 'bold',
      };
    case '8(a)':
      return {
        backgroundColor: '#e8ffed',
        color: '#528162',
        fontWeight: 'bold',
      };
    case 'HUBZone':
      return {
        backgroundColor: '#5fc64c',
        color: 'white',
        fontWeight: 'bold',
      };
    case 'LGBTQ+':
      return {
        backgroundColor: '#a32987',
        color: 'white',
        fontWeight: 'bold',
      };
    case 'Indian Economic Enterprise':
      return {
        backgroundColor: '#ea35bd',
        color: 'black',
        fontWeight: 'bold',
      };
    case 'Local':
      return {
        backgroundColor: '#bdf2ff',
        color: '#1656c6',
        fontWeight: 'bold',
      };
    case 'Small Business':
      return {
        backgroundColor: '#D8E3FF',
        color: '#1656c6',
        fontWeight: 'bold',
      };
    default:
      return {
        backgroundColor: '#cccccc',
        color: 'black',
        fontWeight: 'bold',
      };
  }
};

export const getFriendlyCertificationColorRevisedDot = (name: any): string => {
  switch (name) {
    case 'DBE':
      return 'opportunity-dbe mr-2';
    case 'Minority':
      return 'opportunity-minority mr-2';
    case 'Women':
      return 'opportunity-woman mr-2';
    case 'Disability':
      return 'opportunity-disability mr-2';
    case 'Veteran':
      return 'opportunity-veteran mr-2';
    case '8(a)':
      return 'opportunity-8a mr-2';
    case 'HUBZone':
      return 'mr-2';
    case 'LGBTQ+':
      return 'mr-2';
    case 'Indian Economic Enterprise':
      return 'mr-2';
    case 'Local':
      return 'opportunity-local mr-2';
    case 'Small Business':
      return 'opportunity-small-business mr-2';
    default:
      return 'mr-2';
  }
};

