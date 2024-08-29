import { A, Application, Def, Div, Index, R } from "../deps.ts";
import { Access, Span } from "../deps.ts";
import { Expression, Expressions, M } from "../deps.ts";

/////////////////////
// General-purpose //
/////////////////////

export function MCeil({ children }: { base?: Expressions, children?: Expressions }): Expression {
  return (
    <M>\lceil<exps x={children}/>\rceil</M>
  );
}

export function MFloor({ children }: { base?: Expressions, children?: Expressions }): Expression {
  return (
    <M>\lfloor<exps x={children}/>\rfloor</M>
  );
}

export function MLog({ children, base }: { base?: Expressions, children?: Expressions }): Expression {
  return (
    <M>\log{base ? <>_<Curly><exps x={base}/></Curly></> : ""}(<exps x={children}/>)</M>
  );
}

export function Mathcal({ children }: { children?: Expressions }): Expression {
  return (
    <M>\mathcal<Curly><exps x={children}/></Curly></M>
  );
}

export function MAligned({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      \begin<Curly>aligned</Curly>
        <exps x={children}/>
      \end<Curly>aligned</Curly>
    </M>
  );
}

export function MParen({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      \left(<exps x={children}/>\right)
    </M>
  );
}

export function Sum({ sub, sup, children }: { sub?: Expressions, sup?: Expressions, children?: Expressions }): Expression {
  return (
    <M>
      \sum
      {sub
        ? (
          <>
            _<Curly>
            <exps x={sub} />
            </Curly>
          </>
        )
        : ""}
      {sup
        ? (
          <>
            ^<Curly>
            <exps x={sup} />
            </Curly>
          </>
        )
        : ""}
        <exps x={children}/>
    </M>
  );
}

export function Exp({ sup, children }: { sup?: boolean, children?: Expressions }): Expression {
  return (
    <M>
      { sup
        ? <>e^<Curly><exps x={children}/></Curly></>
        : <>\exp\left(<exps x={children}/>\right)</>
      }
    </M>
  );
}

export function Mathfrak({ children }: { children?: Expressions }): Expression {
  return (
    <M>\mathfrak<Curly><exps x={children}/></Curly></M>
  );
}

export function MFrac({ num, de }: { num: Expressions, de: Expressions }): Expression {
  return (
    <M>\frac<Curly><exps x={num}/></Curly><Curly><exps x={de}/></Curly></M>
  );
}

export function Curly({ children }: { children?: Expressions }): Expression {
  return (
    <>{"{"}<exps x={children}/>{"}"}</>
  );
}

export function MSet({ children }: { children?: Expressions }): Expression {
  return (
    <M>{"\\{"}<exps x={children}/>{"\\}"}</M>
  );
}

export function BigO({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      <Mathcal>O</Mathcal>(<exps x={children} />)
    </M>
  );
}

export function Pr({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      ℙ \left(<exps x={children} />\right)
    </M>
  );
}

export function E({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      𝔼 \left(<exps x={children} />\right)
    </M>
  );
}

export function BigTheta({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      \Theta
      {"("}
      <exps x={children} />
      {")"}
    </M>
  );
}

export function BigOmega({ children }: { children?: Expressions }): Expression {
  return (
    <M>
      \Omega
      {"("}
      <exps x={children} />
      {")"}
    </M>
  );
}

/**
 * \Nat^{+}
 */
export function Np(): Expression {
  return <M>\N^{`{+}`}</M>;
}

/**
 * Render a string as an operator name.
 */
export function OpName({ children }: { children: Expressions }): Expression {
  return (
    <M>
      \mathrm{"{"}
      <exps x={children} />
      {"}"}
    </M>
  );
}

/**
 * Mathy function name and optional type. Creates a DefRef def for the function. Children are the rendered name of the function.
 */
export function MFunDef(
  { n, preview, dom, co, sub, children }: {
    n: string;
    preview?: Expression;
    dom: Expressions;
    co: Expressions;
    sub?: Expressions;
    children: Expressions;
  },
): Expression {
  return (
    <M>
      <Def
        n={n}
        preview={preview}
        r={
          <OpName>
            <exps x={children} />
          </OpName>
        }
      />
      {sub
        ? (
          <>
            _{"{"}
            <exps x={sub} />
            {"}"}
          </>
        )
        : ""}
      {dom && co
        ? (
          <>
            {":"} <exps x={dom} /> \rightarrow <exps x={co} />
          </>
        )
        : ""}
    </M>
  );
}

export function NoWrap({ children }: { children: Expressions }): Expression {
  return (
    <Span clazz="nowrap">
      <exps x={children} />
    </Span>
  );
}

export function Quotes({ children }: { children: Expressions }): Expression {
  return (
    <>“<exps x={children} />”</>
  );
}

/////////////////////////////
// Specific to this paper. //
/////////////////////////////

function Turbo({ children, color }: { children: Expressions, color: string }): Expression {
  return (
    <Span clazz="coloredData" style={`background: #${color};`}>
      <exps x={children} />
    </Span>
  );
}

export function Turbo1({ children }: { children: Expressions}): Expression {
  return <Turbo color="5C39A3"><exps x={children} /></Turbo>
}

export function Turbo2({ children }: { children: Expressions}): Expression {
  return <Turbo color="5349C9"><exps x={children} /></Turbo>
}

export function Turbo3({ children }: { children: Expressions}): Expression {
  return <Turbo color="426FF2"><exps x={children} /></Turbo>
}

export function Turbo4({ children }: { children: Expressions}): Expression {
  return <Turbo color="2F9DF5"><exps x={children} /></Turbo>
}

export function Turbo5({ children }: { children: Expressions}): Expression {
  return <Turbo color="25C6D8"><exps x={children} /></Turbo>
}

export function Turbo6({ children }: { children: Expressions}): Expression {
  return <Turbo color="2EE5AE"><exps x={children} /></Turbo>
}

export function Turbo7({ children }: { children: Expressions}): Expression {
  return <Turbo color="4DF884"><exps x={children} /></Turbo>
}

export function Turbo8({ children }: { children: Expressions}): Expression {
  return <Turbo color="7BFE5F"><exps x={children} /></Turbo>
}

export function Turbo9({ children }: { children: Expressions}): Expression {
  return <Turbo color="AFF444"><exps x={children} /></Turbo>
}

export function Turbo10({ children }: { children: Expressions}): Expression {
  return <Turbo color="DEDD32"><exps x={children} /></Turbo>
}

export function Turbo11({ children }: { children: Expressions}): Expression {
  return <Turbo color="FEB927"><exps x={children} /></Turbo>
}

export function Turbo12({ children }: { children: Expressions}): Expression {
  return <Turbo color="FF8E1F"><exps x={children} /></Turbo>
}

export function Turbo13({ children }: { children: Expressions}): Expression {
  return <Turbo color="F65F18"><exps x={children} /></Turbo>
}

export function Turbo14({ children }: { children: Expressions}): Expression {
  return <Turbo color="D0330E"><exps x={children} /></Turbo>
}

export function Turbo15({ children }: { children: Expressions}): Expression {
  return <Turbo color="A51403"><exps x={children} /></Turbo>
}

export function Turbo16({ children }: { children: Expressions}): Expression {
  return <Turbo color="900C00"><exps x={children} /></Turbo>
}

export type Box = {
  isChunk: boolean,
  content: Expressions,
  x: number,
  y: number,
  children: number[], // Set to own number for parents of chunk nodes.
}

export type BoxStatus = "done" // client used this value and can now discard it
  | "unve" // unverified data the client will need in the future
  | "veri" // verified data the client will need in the future
  | "miss"; // data not yet received by the client

export type Computation = {
  isChunk: true,
  index: number,
  content: string,
  isRoot?: boolean,
} | {
  isChunk: false,
  resultsIn: number,
  left: number,
  right: number,
  len: number,
  isRoot?: boolean,
} | {
  trusted: number,
};

export type VerificationStep = {
  boxStatuses: BoxStatus[],
  computations: Computation[],
}

const scaleX = 4;
const scaleY = 5;
const chunkTransmissionOffset = 0.5

export function VisualizeVerification({ slidesId, boxes, steps, compact, layers, skipping = [] }: { slidesId: string, boxes: Box[], steps: VerificationStep[], compact?: boolean, layers: number, skipping?: number[]}): Expression {
  const rows: Expression[] = [];

  steps.forEach((step, i) => {
    rows.push(<>
      <Div clazz={`clientStateRow${compact ? " compact" : ""}`}><VisualizeVerificationRow boxes={boxes} stateRow={step.boxStatuses} skipping={skipping}/></Div>
      <Div style="display: flex;">
        <Div style="flex-grow: 1;">
          <Div clazz="clientTreeContainer" style={`height: ${(layers + chunkTransmissionOffset) * scaleY}rem;`}>
            <RenderTreeEdges boxes={boxes}/>
            <VisualizeVerificationTreeRow boxes={boxes} stateRow={step.boxStatuses} computations={step.computations}/>
          </Div>
        </Div>
        <Div clazz="clientTreeComputations">
          <RenderComputations steps={steps} stepIndex={i}/>
        </Div>
      </Div>
    </>);
  });

  return <Slides slideshowId={slidesId} slides={rows}/>;
}

function VisualizeVerificationRow({ boxes, stateRow, skipping }: { boxes: Box[], stateRow: BoxStatus[], skipping: number[]}): Expression {
  return <impure fun={(ctx) => {
    if (stateRow.length != boxes.length) {
      ctx.log("Found stateRow with different length than the number of boxes.");
      ctx.halt();
    }
  
    const renderedBoxes: Expression[] = [];

    stateRow.forEach((status, i) => {
      if (i > 0 && (skipping.indexOf(i) === -1)) {
        const content: Expression = boxes[i].isChunk ?
          <exps x={boxes[i].content}/> :
          <><M>{`\\mathtt{lbl}(`}</M><exps x={boxes[i].content}/><M>{`)`}</M></>;
        renderedBoxes.push(<Div clazz={`clientStateBox ${status} ${boxes[i].isChunk ? "chunk" : "label"}`}>{content}</Div>);
      }
    });
  
    return <exps x={renderedBoxes}/>;
  }}/>;
}

function VisualizeVerificationTreeRow({ boxes, stateRow, computations }: { boxes: Box[], stateRow: BoxStatus[], computations: Computation[]}): Expression {
  return <impure fun={(ctx) => {
    if (stateRow.length != boxes.length) {
      ctx.log("Found stateRow with different length than the number of boxes.");
      ctx.halt();
    }

    const renderedNodes: Expression[] = [];

    stateRow.forEach((status, i) => {
      const content: Expression = boxes[i].isChunk ?
        <exps x={boxes[i].content}/> :
        <exps x={boxes[i].content}/>;

      const y = (boxes[i].isChunk ? boxes[i].y + chunkTransmissionOffset : boxes[i].y) * scaleY;
      const x = boxes[i].x * scaleX;

      renderedNodes.push(<Div clazz={`clientStateNode ${status} ${boxes[i].isChunk ? "chunk" : "label"}`} style={`transform: translate(calc(${x}rem - 50%), calc(${y}rem - 50%));`}>{content}</Div>);
    });
  
    return <exps x={renderedNodes}/>;
  }}/>;
}

function RenderComputations({ steps, stepIndex }: { steps: VerificationStep[], stepIndex: number}): Expression {
  return <impure fun={(ctx) => {
    const renderedComputations: Expression[] = [];

    for (let i = 0; i < steps.length; i++) {
      for (const comp of steps[i].computations) {
        renderedComputations.push(<RenderComputation old={i < stepIndex} future={i > stepIndex} comp={comp}/>);
      }
    }
  
    return <exps x={renderedComputations}/>;
  }}/>;
}

function RenderComputation({ old, future, comp }: { old: boolean, future: boolean, comp: Computation}): Expression {
  let lhs = -1;
  let op = "is";
  let rhs: Expression = "trusted";

  if ("trusted" in comp && comp.trusted) {
    lhs = comp.trusted;
  } else if ("isChunk" in comp) {
    op = "=";

    if (comp.isChunk) {
      lhs = comp.index;
      rhs = <Application fun="hash_chunk" args={[comp.content, `${!!comp.isRoot}`]}/>;
    } else {
      lhs = comp.resultsIn;
      rhs = <Application fun="hash_chunk" args={[
        <Application fun="lbl" args={[`${comp.left}`]}/>,
        <Application fun="lbl" args={[`${comp.right}`]}/>,
        `${comp.len}`,
        `${!!comp.isRoot}`,
      ]}/>;
    }
  }


  return <Div clazz={`computation${old ? " old" : ""}${future ? " future" : ""}`}>
    <Application fun="lbl" args={[`${lhs}`]}/> {op} {rhs}
  </Div>;
}

export function RenderTreeEdges({ boxes}: { boxes: Box[]}): Expression {
  const renderedEdges: Expression[] = [];

  boxes.forEach((box, i) => {
    if (box.children.length === 2) {
      for (const childNumber of box.children) {
        let childBox = box;
        for (const potentialChildBox of boxes) {
          if (potentialChildBox.content === `${childNumber}`) {
            childBox = potentialChildBox;
            break;
          }
        }
        
        const startScaledX = box.x * scaleX;
        const startScaledY = box.y * scaleY;
        const endScaledX = childBox.x * scaleX;
        const endScaledY = childBox.y * scaleY;
        
        const length = Math.sqrt(((startScaledX - endScaledX)) * (startScaledX - endScaledX) + (startScaledY - endScaledY) * (startScaledY - endScaledY));
        const angleRadians = Math.atan2((endScaledY - startScaledY), (endScaledX - startScaledX));
  
        renderedEdges.push(<Div clazz="treeEdge" style={`width: ${length}rem; transform: translate(${startScaledX}rem, ${startScaledY}rem) rotate(${angleRadians}rad); transform-origin: left`}/>);
      }
    }
  });

  return <exps x={renderedEdges}/>;
}

/**
 * Generate a CSS-only slideshow that cycles through the given expressions as content.
 */
export function Slides({ slides, slideshowId }: { slides: Expression[], slideshowId: string}): Expression {
  const renderedSlides: Expression[] = [];

  slides.forEach((slide, i) => {
    const prev = <A
    clazz={`slideNavButton prev${i === 0 ? " inactive" : ""}`}
    href={i === 0 ? undefined : `#${slideshowId}_${i - 1}`}>
      Previous Step
    </A>;

    const next = <A
    clazz={`slideNavButton next${i === (slides.length - 1) ? " inactive" : ""}`}
    href={i === (slides.length - 1) ? undefined : `#${slideshowId}_${i + 1}`}>
      Next Step
    </A>;

    renderedSlides.push(<Div clazz="slide" id={`${slideshowId}_${i}`}>
      <Div clazz="slideNav">{prev}{next}</Div>
      <Div clazz="slideContent"><exps x={slide}/></Div>
    </Div>);
  });

  return <Div clazz="slider">
    <Div clazz="slides">
      <exps x={renderedSlides}/>
    </Div>
  </Div>;
}