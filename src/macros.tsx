import { Def, Div, Index, R } from "../deps.ts";
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
}

export type BoxStatus = "done" // client used this value and can now discard it
  | "unve" // unverified data the client will need in the future
  | "veri" // verified data the client will need in the future
  | "miss"; // data not yet received by the client

export function VisualizeVerification({ boxes, states, compact }: { boxes: Box[], states: BoxStatus[][], compact?: boolean}): Expression {
  const rows: Expression[] = [];

  for (const stateRow of states) {
    rows.push(<Div clazz={`clientStateRow${compact ? " compact" : ""}`}><VisualizeVerificationRow boxes={boxes} stateRow={stateRow}/></Div>);
  }

  return <exps x={rows}/>;
}

function VisualizeVerificationRow({ boxes, stateRow }: { boxes: Box[], stateRow: BoxStatus[]}): Expression {
  return <impure fun={(ctx) => {
    if (stateRow.length != boxes.length) {
      ctx.log("Found stateRow with different length than the number of boxes.");
      ctx.halt();
    }
  
    const renderedBoxes: Expression[] = [];

    stateRow.forEach((status, i) => {
      const content: Expression = boxes[i].isChunk ?
        <exps x={boxes[i].content}/> :
        <><M>{`\\mathtt{lbl}(`}</M><exps x={boxes[i].content}/><M>{`)`}</M></>;
      renderedBoxes.push(<Div clazz={`clientStateBox ${status} ${boxes[i].isChunk ? "chunk" : "label"}`}>{content}</Div>);
    });
  
    return <exps x={renderedBoxes}/>;
  }}/>;
}