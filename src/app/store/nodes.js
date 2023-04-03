import { createSlice } from "@reduxjs/toolkit";
import nodeService from "../services/node.service";

const nodesSlice = createSlice({
  name: "nodes",
  initialState: {
    entities: [ 
      {
        "id":"1",
        "name":"Физика",
        "position": { "x": 250, "y": 700 },
        "type": "physics",
        "tags": []
      },
      {
        "id":"2",
        "name":"Механика",
        "position": { "x": 200, "y": 310 },
        "type": "section",
        "parent": "1",
        "tags": []
      },
      {
        "id":"3",
        "name":"Колебания и волны. Оптика",
        "position": { "x": 10, "y": 380 },
        "type": "section",
        "parent": "1",
        "tags": []
      },
      {
        "id":"4",
        "name":"Астрономия",
        "position": { "x": -210, "y": 495 },
        "type": "section",
        "parent": "1",
        "tags": []
      },
      {
        "id":"5",
        "name":"Атомная и ядерная физика",
        "position": { "x": 309, "y": 355 },
        "type": "section",
        "parent": "1",
        "tags": []
      },
      {
        "id":"6",
        "name":"Теплота. Молекулярная физика",
        "position": { "x": 475, "y": 405 },
        "type": "section",
        "parent": "1",
        "tags": []
      },
      {
        "id":"7",
        "name":"Электричество и магнетизм",
        "position": { "x": 690, "y": 475 },
        "type": "section",
        "parent": "1",
        "tags": []
      },
      {
        "id":"8",
        "name":"Это интересно",
        "position": { "x": -135, "y": 430 },
        "type": "section",
        "parent": "1",
        "tags": []
      },
      {
        "id":"9",
        "name":"Работа и энергия",
        "position": { "x": 250, "y": 150 },
        "type": "subsection",
        "parent": "2",
        "tags": []
      },
      {
        "id":"10",
        "name":"Механическая работа",
        "position": { "x": 250, "y": 110 },
        "type": "lesson",
        "parent": "9",
        "tags": [],
        "video": {
          "codeVideo": "Ox07SKVfGSE",
          "description": " Для совершения работы нужна энергия. Энергия — это запасённая возможность совершить работу. Энергия запасена в потоке воды или ветра, в порохе и бензине.\nВеличина механической работы определяется произведением силы на путь. 1 джоуль — это работа, которую совершает сила в 1 ньютон на перемещении в 1 м.\nМеханизмы позволяют выигрывать в силе, проигрывая в расстоянии; однако выиграть с их помощью в совершённой работе невозможно."  
        }
      },
      {
        "id":"11",
        "name":"Криволинейное движение",
        "position": { "x": 352, "y": 188 },
        "type": "subsection",
        "parent": "2",
        "tags": []
      },
      {
        "id":"12",
        "name":"Динамика",
        "position": { "x": 30, "y": 200 },
        "type": "subsection",
        "parent": "2",
        "tags": []
      },
      {
        "id":"13",
        "name":"Статика",
        "position": { "x": 133, "y": 162 },
        "type": "subsection",
        "parent": "2",
        "tags": []
      },
      {
        "id":"14",
        "name":"Центр тяжести",
        "position": { "x": 133, "y": 125 },
        "type": "lesson",
        "parent": "13",
        "tags": [],
        "video": {
          "codeVideo": "Pt8Mb6i5ZeA",
          "description": "Если весомую пластину подвешивать за разные её точки, линии всех отвесов пройдут через одну точку — центр тяжести этой пластины. Центр тяжести пластины при этом всегда стремиться занять наинизшее положение. Если пластину подвесить за её центр тяжести, она будет пребывать в безразличном равновесии, и её части по разные стороны от оси подвеса будут уравновешивать друг друга. Центр тяжести связан с равновесием, и от положения центра тяжести зависит, будет ли равновесие устойчивым или нет. На этом основан ряд замечательных опытов, похожих на удивительные фокусы. В задачах об отыскании центра тяжести физика сближается с геометрией, и наши рассуждения становятся похожими на доказательства геометрических теорем. "  
        }
      },
      {
        "id":"15",
        "name":"Всемирное тяготение",
        "position": { "x": 545, "y": 233 },
        "type": "subsection",
        "parent": "2",
        "tags": []
      },
      {
        "id":"16",
        "name":"Гидро- и аэростатика",
        "position": { "x": -126, "y": 251 },
        "type": "subsection",
        "parent": "2",
        "tags": []
      },
      {
        "id":"17",
        "name":"Трубка Пито",
        "position": { "x": -133, "y": 233 },
        "type": "lesson",
        "parent": "16",
        "tags": ["7 класс"],
        "video": {
          "codeVideo": "F2x7MEJnVjk",
          "description": "Трубка Пито измеряет избыточное давление, создаваемое за счёт воздушного напора, и позволяет рассчитывать скорость воздушного потока относительно самолёта, или, что то же самое, скорость самолёта относительно воздуха."  
        }
      },
      {
        "id":"18",
        "name":"Маятник",
        "position": { "x": 40, "y": 170 },
        "type": "lesson",
        "parent": "12",
        "tags": ["8 класс"],
        "video": {
          "codeVideo": "JJFczJe-jqc",
          "description": "Мы изучаем, как период колебаний маятника зависит от уместных здесь параметров. От массы груза он не зависит вообще, и от амплитуды при малых углах он зависит очень слабо. А вот при увеличении длины подвеса период растёт как квадратный корень из этой длины."  
        }
      },
      {
        "id":"19",
        "name":"Соударение шаров",
        "position": { "x": 60, "y": 170 },
        "type": "lesson",
        "parent": "12",
        "tags": ["8 класс","9 класс"],
        "video": {
          "codeVideo": "N1OZqtmzB50",
          "description": "Подвесим два одинаковых стальных шара на нитях, отведём один шар и отпустим его. После соударения он остановится, передав свою скорость второму шару. Так же ведут себя и шары на бильярдном столе при сильном ударе. Если удар нецентральный, бильярдные шары разлетаются после удара под прямым углом друг к другу. Эти факты легко доказываются переходом в систему центра масс обоих шаров."  
        }
      }
      
    ]
    ,
    isLoading: true,
    error: null,
    dataLoaded: false
  },
  reducers: {
    nodesRequested: (state) => {
      state.isLoading = true;
    },
    nodesReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    nodesRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { actions, reducer: nodesReducer } = nodesSlice;
const { nodesRequested, nodesReceived, nodesRequestFailed } = actions;

export const loadNodesList = () => async (dispatch, getState) => {
  dispatch(nodesRequested());
  try {
    const { content } = await nodeService.fetchAll();
    dispatch(nodesReceived(content));
  } catch (error) {
    dispatch(nodesRequestFailed(error.message));
  }
};

export const getNodes = () => (state) => state.nodes.entities;
export const getNodesLoadingStatus = () => (state) =>
  state.nodes.isLoading;
export const getNodesDataStatus = () => (state) => state.nodes.dataLoaded;
export const getNodeById = (id) => (state) => {
  if (state.nodes.entities) {
    return state.nodes.entities.find((node) => node._id === id);
  }
};
export const getNodeNameByNode = (node) => (state) => {
  if (state.nodes.entities) {
    return state.nodes.entities.find((s) => s.node === node);
  }
};

export default nodesReducer;
