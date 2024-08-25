import {
  AccessStruct,
  AccessTuple,
  Application,
  Bib,
  Bibliography,
  BlankPattern,
  Br,
  DefValue,
  Dfn,
  Else,
  ElseIf,
  Enum,
  Gt,
  If,
  Img,
  Interface,
  Let,
  LetRaw,
  Loc,
  Lt,
  Match,
  QualifiedMember,
  Self,
  SpliceLoc,
  Struct,
  StructDef,
  Sup,
  Tuple,
  TupleType,
  TypeApplication,
  Table,
  Tr,
  Td,
  Tbody,
  Th,
  Thead,
  H6,
} from "macromaniajsx/jsx-runtime";
import {
  A,
  Code,
  Context,
  Counter,
  Def,
  Em,
  FunctionItem,
  Hsection,
  Li,
  M,
  makeFigureMacro,
  makeNumberingRenderer,
  Marginale,
  MM,
  P,
  PreviewScope,
  Pseudocode,
  R,
  Rc,
  Rcb,
  ResolveAsset,
  Return,
  Rs,
  Rsb,
  Sidenote,
  Span,
  Ul,
  Wip,
  Expressions,
  Expression,
} from "macromaniajsx/jsx-runtime";
import { ArticleTemplate } from "./articleTemplate.tsx";
import {
  BigO,
  Curly,
  Cyan,
  Magenta,
  Sum,
  Pr,
  E,
  Exp,
  Mathfrak,
  MAligned,
  MCeil,
  MFrac,
  MFunDef,
  MLog,
  MSet,
  NoWrap,
  Np,
  MParen,
  OpName,
  Orange,
  Pink,
  Quotes,
  Rank,
  TreeChild,
  TreeChildren,
  TreeItem,
} from "./macros.tsx";
import { TreeItems } from "./macros.tsx";
import { GeoDistribution } from "./macros.tsx";
import { ApplicationRaw, DefFunction } from "../deps.ts";

const ctx = new Context();

function Alj({children, inline}: {children?: Expressions, inline?: boolean}): Expression {
  return <Wip fg="#6804cc" bg="#ecdbfc" wrap={(_ctx, inner) => <>alj: {inner}</>} children={children} inline={inline}/>;
}

/*
Create macros for figures (which includes theorem-like blocks).
*/

const figureCounter = new Counter("figure-counter", 0);
const Fig = makeFigureMacro(ctx, {
  figureCounter: figureCounter,
  numberingInfo: {
    r: "Figure",
    rb: "Figure",
    rs: "Figures",
    rsb: "Figures",
    render: makeNumberingRenderer(),
  },
});

// A counter shared by several theorem-like blocks.
const thmCounter = new Counter("thm-counter", 0);

const Definition = makeFigureMacro(ctx, {
  figureCounter: thmCounter,
  numberingInfo: {
    r: "Definition",
    rb: "Definition",
    rs: "Definition",
    rsb: "Definition",
    render: makeNumberingRenderer(),
  },
  isTheoremLike: true,
});

// The full input to Macromania is a single expression, which we then evaluate.
const exp = (
  <ArticleTemplate
    title="Bab"
    titleId="title"
    abstract={
      <>
        <P>
          Bab is a <A href="https://en.wikipedia.org/wiki/Cryptographic_hash_function">secure hash function</A> heavily inspired by Blake3, designed for use in peer-to-peer content-addressed storage systems.
        </P>
      </>
    }
    authors={[
      {
        name: <A href="https://aljoscha-meyer.de/">Aljoscha Meyer</A>,
        email: <A href="mailto:research@aljoscha-meyer.de">research@aljoscha-meyer.de</A>,
      },
    ]}
  >
    <Hsection n="introduction" title="Introduction">
      <P>
        <A href="https://en.wikipedia.org/wiki/Content-addressable_storage">Content-addressable storage</A> lets users refer to strings (files) by a secure hash. Bab is a specification for a hash function specifically designed for usage in peer-to-peer content-addressable storage systems.
      </P>      

      <P>
        The key feature of Bab is that it allows holders of a string to authenticate any substring as occuring in the original string. Content-addressed storage systems without this feature face a problem in byzanthine environments. Suppose a client requests the string corresponding to some hash. The server replies with some data, but the connection is interrupted before the full string was transfered. What should the client do?
      </P>

      <P>
        It could store the data it received, and later it could issue a request for the same string, resuming at the correct offset. But that request will fail if the orginal server fed it garbage, and the client will be unable to tell which of its two communication partners acted maliciously. Also, the server might have sent it data that is illegal to store. Hence, a careful client should discard all incomplete data it received. But this makes it highly unlike to successfully transfer large strings over an unreliable network.
      </P>

      <P>
        When strings are hashed with Bab, servers embed into the data stream efficiently verifiable proofs that the data they have sent so far is indeed part of the requested string. More specifically, Bab enables the following features (all of which will be explained in detail later):
      </P>

      <Ul>
        <Li>secure content-addressing,</Li>
        <Li>incremental verification of streaming string data,</Li>
        <Li>efficient verification of arbitrary subslices within a string, and</Li>
        <Li>constant-size length proofs for strings.<Marginale>While we explore Bab in the context of hashing, you can also think of it as an <Bib item="tamassia2003authenticated">authenticated data structure</Bib> for arrays.</Marginale></Li>
      </Ul>

      <P>
        Bab employs many of the same techniques as the <A href="https://github.com/BLAKE3-team/BLAKE3-specs/blob/master/blake3.pdf">Blake3</A>-based <A href="https://github.com/oconnor663/bao/blob/master/docs/spec.md">Bao</A> spec. Key differences are short proofs of string length, more efficient slice requests, and a hash-function-agnostic specification. Bao is a byproduct of a well-designed general-purpose hash function, whereas Bab is a special-purpose hash function that gets to add features beyond Bao’s capabilities.
      </P>
    </Hsection>

    <Hsection n="the_function" title="The Bab Hash Function">
      <P>
        Like Blake3, Bab hashes an input string by splitting it into chunks, arranging the chunks as the roots of a <A href="https://en.wikipedia.org/wiki/Binary_tree">binary</A>, <A href="https://en.wikipedia.org/wiki/Binary_tree#complete">left-full</A> <A href="https://en.wikipedia.org/wiki/Merkle_tree">Merkle-tree</A>; the label of the root becomes the digest of the input.
      </P>

      <Hsection n="parameters" title="Parameters">
        <P>
          Bab leaves open some paramters, they need to be given as <Quotes>input</Quotes> to the Bab specification. We now list the precise parameters of a Bab instantiation.
        </P>

        <PreviewScope>
          <P>
            The <DefValue n="chunk_size"/> value must be a natural number greater than zero.
            Given an input bytestring <DefValue n="in"/> of at most <M>2^<Curly>64</Curly> - 1</M> bytes, Bab splits it into a non-empty sequence <DefValue n="chunks"/> of <Def n="chunk" rs="chunks">chunks</Def>: the first <R n="chunk_size"/> bytes become the first <R n="chunk"/>, the next <R n="chunk_size"/> bytes become the second <R n="chunk"/>, and so on.
            Only the final <R n="chunk"/> may be shorter than <R n="chunk_size"/>.
            For example, splitting the ASCII string <Code>hello_world</Code> with a <R n="chunk_size"/> of <Code>2</Code> yields the <Rs n="chunk"/> <Code>he</Code>, <Code>ll</Code>, <Code>o_</Code>, <Code>wo</Code>, <Code>rl</Code>, and <Code>d</Code>.
            If <R n="in"/> is the empty string, then <R n="chunks"/> consists of a single, empty <R n="chunk"/>.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            The <DefValue n="width"/> value must be a natural number greater than zero. Bab maps input bytestrings (of at most <M>2^<Curly>64</Curly> - 1</M> bytes) to digests of <R n="width"/> many bytes.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            The <DefFunction n="hash_chunk"/> function determines the labels of the leaf nodes of Bab’s Merkle-tree.
            It must be a function that maps a triplet of a <R n="chunk"/>, a chunk index (a natural number between zero and <Code>ceil(<M>2^<Curly>64</Curly> - 1</M>, <R n="chunk_size"/>)</Code>), and a boolean flag (whether the node is the root node or not) to bytestrings of <R n="width"/> bytes.
          </P>
        </PreviewScope>

        <PreviewScope>
          <P>
            The <DefFunction n="hash_inner"/> function determines the labels of the inner nodes of Bab’s Merkle-tree.
            It must be a function that maps a quadruplet of two bytestrings of <R n="width"/> bytes (the labels of the two child nodes), an unsigned 64-bit integer (the length of the input substring covered by the node), and a boolean flag (whether the node is the root node or not) to bytestrings of <R n="width"/> bytes.            
          </P>
        </PreviewScope>
      </Hsection>

      <Hsection n="tree" title="The Merkle Tree">
        <P>
          To hash a bytestring <R n="in"/> that was split into a <R n="chunk"/> sequence <R n="chunks"/>, Bab constructs a <A href="https://en.wikipedia.org/wiki/Binary_tree#complete">left-full</A> <A href="https://en.wikipedia.org/wiki/Binary_tree">binary</A> tree with one leaf per <R n="chunk"/>; we number the vertices in <A href="https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search">breadth-first</A> order, starting at <M>1</M> in the root. <Rc n="fig_tree_unlabeled"/> shows an example.
        </P>

        <Fig
          n="fig_tree_unlabeled"
          // wrapperTagProps={{clazz: "wide"}}
          title="Unlabeled Example Tree"
          caption={
            <>
              <P>
                The (unlabeled) binary tree for the input string <Code>hello_world</Code> with a <R n="chunk_size"/> of <Code>2</Code>.
              </P>
            </>
          }
        >
          <Img
            src={<ResolveAsset asset={["graphics", "tree_unlabeled.svg"]} />}
            alt="A left-full binary tree, the result of giving the input string *hello_world*."
          />
        </Fig>

        <PreviewScope>
          <P>
            Bab assigns to each vertex <DefValue n="lblv" r="v"/> a label <ApplicationRaw fun={<DefFunction n="lbl"/>} args={[<R n="lblv"/>]}/>; the root label serves as the <DefValue n="digest" rs="digests"/> of <R n="in"/>.
          </P>

          <P>
            If <R n="lblv"/> is a leaf vertex corresponding to the <DefValue n="lbl_leaf_i" r="i"/>-th <R n="chunk"/> (zero-indexed) <DefValue n="lbl_leaf_c" r="c"/>, then <Application fun="lbl" args={[<R n="lblv"/>]}/> is <Application fun="hash_chunk" args={[<R n="lbl_leaf_c"/>, <R n="lbl_leaf_i"/>, "true"]}/> if <R n="lbl_leaf_c"/> is the <Em>only</Em> <R n="chunk"/> in <R n="chunks"/>, and <Application fun="hash_chunk" args={[<R n="lbl_leaf_c"/>, <R n="lbl_leaf_i"/>, "false"]}/>, otherwise.
          </P>

          <P>
            If <R n="lblv"/> is an inner vertex, let <DefValue n="lbl_inner_l" r="left"/> denote its left child, let <DefValue n="lbl_inner_r" r="right"/> denote its right child, let <DefValue n="lbl_inner_len" r="len"/> denote the total length of the <Rs n="chunk"/> corresponding to all leaf descendents of <R n="lblv"/>, and let <DefValue n="lbl_inner_is_root" r="is_root"/> be <Code>true</Code> if and only if <R n="lblv"/> is the root of the tree.
            Then <Application fun="lbl" args={[<R n="lblv"/>]}/> is <Application fun="hash_inner" args={[<R n="lbl_inner_l"/>, <R n="lbl_inner_r"/>, <R n="lbl_inner_len"/>, <R n="lbl_inner_is_root"/>]}/>.
          </P>
        </PreviewScope>
      </Hsection>      
    </Hsection>

    <Hsection title="References" n="bibliography" noNumbering>
      <Bibliography />
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);

/*
what, why (link), sync/nb/nb_send, basics: producer-buffered-bulk, consumer-buffered-bulk, piping, wrappers, feature flags, queues, converters
*/