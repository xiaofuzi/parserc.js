var pr = require('../lib/parserc'),
    state = require('../lib/state');


var parser = {};

/*
 * [+, -]
 */
parser.operater01 = pr.or(
    pr.literal("+"),
    pr.literal("-")
);

/*
 * [/, *]
 */
parser.operater02 = pr.or(
    pr.literal("*"),
    pr.literal("/")
)

parser.int = pr.integers();
parser.float = pr.sequence(
    parser.int,
    pr.literal('.'),
    parser.int
);
parser.num = pr.or(
    parser.float,
    parser.int
)

/*
 * factor: INTEGER | expr
 */
// parser.factor = pr.or(
// 		parser.expr,
// 		parser.num
// )
parser.factor = parser.num;

/*
 * term : factor ((MUL | DIV) factor)*
 */
parser.term = pr.sequence(
    parser.factor,
    pr.zeromore(
        pr.and(
            parser.operater02,
            parser.factor
        )
    )
)

/*
 * expr   : term ((PLUS | MINUS) term)*      
 * term   : factor ((MUL | DIV) factor)*
 * factor : INTEGER
 */

parser.expr = pr.sequence(
    parser.term,
    pr.zeromore(
        pr.and(
            parser.operater01,
            parser.term
        )
    )
)

var mathState = state('1*123**+1+2');


var factors = pr.and(
    parser.factor,
    pr.literal(' ')
);

var puls = pr.many(
    pr.and(
        parser.operater01,
        parser.term
    )
);
var op_num = pr.and(
        parser.factor,
        pr.zeromore(
            pr.and(
                parser.operater01,
                parser.factor
            )
        )
    )

var zeromore = pr.zeromore(
            pr.and(
                parser.operater01,
                parser.factor
            )
        )

var opfactor = pr.and(
                parser.operater01,
                parser.factor
            );
    //pr.literal(' ')(mathState);
    //pr.spaces()(mathState);
    //factors(mathState);
    //parser.num(mathState);
    //pr.many(pr.literal('.'))(mathState);
    //console.log(mathState.match, mathState.pos);
    //parser.expr(mathState);
//parser.factor(mathState);
//puls(mathState);
parser.term(mathState);
//opfactor(mathState);
//op_num(mathState);
//zeromore(mathState);

// pr.many(
// 	pr.and(
// 		parser.operater02,
// 		parser.factor
// 		)
// 	)(mathState);

//pr.zeromore(pr.literal('1'))(mathState);
// pr.many(
// 	pr.and(
// 		parser.num,
// 		pr.literal('a')
// 		)
// 	)(mathState);

console.log(mathState.match, mathState.success);
