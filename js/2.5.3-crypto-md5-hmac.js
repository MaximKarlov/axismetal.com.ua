/*
 * Crypto-JS v2.5.3
 * http://code.google.com/p/crypto-js/
 * (c) 2009-2012 by Jeff Mott. All rights reserved.
 * http://code.google.com/p/crypto-js/wiki/License
 */
(typeof Crypto == 'undefined' || !Crypto.util) &&
    (function () {
        var j = (window.Crypto = {}),
            o = (j.util = {
                rotl: function (h, g) {
                    return (h << g) | (h >>> (32 - g));
                },
                rotr: function (h, g) {
                    return (h << (32 - g)) | (h >>> g);
                },
                endian: function (h) {
                    if (h.constructor == Number) return (o.rotl(h, 8) & 16711935) | (o.rotl(h, 24) & 4278255360);
                    for (var g = 0; g < h.length; g++) h[g] = o.endian(h[g]);
                    return h;
                },
                randomBytes: function (h) {
                    for (var g = []; h > 0; h--) g.push(Math.floor(Math.random() * 256));
                    return g;
                },
                bytesToWords: function (h) {
                    for (var g = [], i = 0, a = 0; i < h.length; i++, a += 8)
                        g[a >>> 5] |= (h[i] & 255) << (24 - (a % 32));
                    return g;
                },
                wordsToBytes: function (h) {
                    for (var g = [], i = 0; i < h.length * 32; i += 8) g.push((h[i >>> 5] >>> (24 - (i % 32))) & 255);
                    return g;
                },
                bytesToHex: function (h) {
                    for (var g = [], i = 0; i < h.length; i++)
                        g.push((h[i] >>> 4).toString(16)), g.push((h[i] & 15).toString(16));
                    return g.join('');
                },
                hexToBytes: function (h) {
                    for (var g = [], i = 0; i < h.length; i += 2) g.push(parseInt(h.substr(i, 2), 16));
                    return g;
                },
                bytesToBase64: function (h) {
                    if (typeof btoa == 'function') return btoa(n.bytesToString(h));
                    for (var g = [], i = 0; i < h.length; i += 3)
                        for (var a = (h[i] << 16) | (h[i + 1] << 8) | h[i + 2], b = 0; b < 4; b++)
                            i * 8 + b * 6 <= h.length * 8
                                ? g.push(
                                      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(
                                          (a >>> (6 * (3 - b))) & 63
                                      )
                                  )
                                : g.push('=');
                    return g.join('');
                },
                base64ToBytes: function (h) {
                    if (typeof atob == 'function') return n.stringToBytes(atob(h));
                    for (var h = h.replace(/[^A-Z0-9+\/]/gi, ''), g = [], i = 0, a = 0; i < h.length; a = ++i % 4)
                        a != 0 &&
                            g.push(
                                (('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.indexOf(
                                    h.charAt(i - 1)
                                ) &
                                    (Math.pow(2, -2 * a + 8) - 1)) <<
                                    (a * 2)) |
                                    ('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.indexOf(
                                        h.charAt(i)
                                    ) >>>
                                        (6 - a * 2))
                            );
                    return g;
                },
            }),
            j = (j.charenc = {});
        j.UTF8 = {
            stringToBytes: function (h) {
                return n.stringToBytes(unescape(encodeURIComponent(h)));
            },
            bytesToString: function (h) {
                return decodeURIComponent(escape(n.bytesToString(h)));
            },
        };
        var n = (j.Binary = {
            stringToBytes: function (h) {
                for (var g = [], i = 0; i < h.length; i++) g.push(h.charCodeAt(i) & 255);
                return g;
            },
            bytesToString: function (h) {
                for (var g = [], i = 0; i < h.length; i++) g.push(String.fromCharCode(h[i]));
                return g.join('');
            },
        });
    })();
(function () {
    var j = Crypto,
        o = j.util,
        n = j.charenc,
        h = n.UTF8,
        g = n.Binary,
        i = (j.MD5 = function (a, b) {
            var h = o.wordsToBytes(i._md5(a));
            return b && b.asBytes ? h : b && b.asString ? g.bytesToString(h) : o.bytesToHex(h);
        });
    i._md5 = function (a) {
        a.constructor == String && (a = h.stringToBytes(a));
        for (
            var b = o.bytesToWords(a),
                g = a.length * 8,
                a = 1732584193,
                d = -271733879,
                c = -1732584194,
                e = 271733878,
                f = 0;
            f < b.length;
            f++
        )
            b[f] = (((b[f] << 8) | (b[f] >>> 24)) & 16711935) | (((b[f] << 24) | (b[f] >>> 8)) & 4278255360);
        b[g >>> 5] |= 128 << g % 32;
        b[(((g + 64) >>> 9) << 4) + 14] = g;
        for (var g = i._ff, k = i._gg, l = i._hh, m = i._ii, f = 0; f < b.length; f += 16)
            var j = a,
                n = d,
                p = c,
                q = e,
                a = g(a, d, c, e, b[f + 0], 7, -680876936),
                e = g(e, a, d, c, b[f + 1], 12, -389564586),
                c = g(c, e, a, d, b[f + 2], 17, 606105819),
                d = g(d, c, e, a, b[f + 3], 22, -1044525330),
                a = g(a, d, c, e, b[f + 4], 7, -176418897),
                e = g(e, a, d, c, b[f + 5], 12, 1200080426),
                c = g(c, e, a, d, b[f + 6], 17, -1473231341),
                d = g(d, c, e, a, b[f + 7], 22, -45705983),
                a = g(a, d, c, e, b[f + 8], 7, 1770035416),
                e = g(e, a, d, c, b[f + 9], 12, -1958414417),
                c = g(c, e, a, d, b[f + 10], 17, -42063),
                d = g(d, c, e, a, b[f + 11], 22, -1990404162),
                a = g(a, d, c, e, b[f + 12], 7, 1804603682),
                e = g(e, a, d, c, b[f + 13], 12, -40341101),
                c = g(c, e, a, d, b[f + 14], 17, -1502002290),
                d = g(d, c, e, a, b[f + 15], 22, 1236535329),
                a = k(a, d, c, e, b[f + 1], 5, -165796510),
                e = k(e, a, d, c, b[f + 6], 9, -1069501632),
                c = k(c, e, a, d, b[f + 11], 14, 643717713),
                d = k(d, c, e, a, b[f + 0], 20, -373897302),
                a = k(a, d, c, e, b[f + 5], 5, -701558691),
                e = k(e, a, d, c, b[f + 10], 9, 38016083),
                c = k(c, e, a, d, b[f + 15], 14, -660478335),
                d = k(d, c, e, a, b[f + 4], 20, -405537848),
                a = k(a, d, c, e, b[f + 9], 5, 568446438),
                e = k(e, a, d, c, b[f + 14], 9, -1019803690),
                c = k(c, e, a, d, b[f + 3], 14, -187363961),
                d = k(d, c, e, a, b[f + 8], 20, 1163531501),
                a = k(a, d, c, e, b[f + 13], 5, -1444681467),
                e = k(e, a, d, c, b[f + 2], 9, -51403784),
                c = k(c, e, a, d, b[f + 7], 14, 1735328473),
                d = k(d, c, e, a, b[f + 12], 20, -1926607734),
                a = l(a, d, c, e, b[f + 5], 4, -378558),
                e = l(e, a, d, c, b[f + 8], 11, -2022574463),
                c = l(c, e, a, d, b[f + 11], 16, 1839030562),
                d = l(d, c, e, a, b[f + 14], 23, -35309556),
                a = l(a, d, c, e, b[f + 1], 4, -1530992060),
                e = l(e, a, d, c, b[f + 4], 11, 1272893353),
                c = l(c, e, a, d, b[f + 7], 16, -155497632),
                d = l(d, c, e, a, b[f + 10], 23, -1094730640),
                a = l(a, d, c, e, b[f + 13], 4, 681279174),
                e = l(e, a, d, c, b[f + 0], 11, -358537222),
                c = l(c, e, a, d, b[f + 3], 16, -722521979),
                d = l(d, c, e, a, b[f + 6], 23, 76029189),
                a = l(a, d, c, e, b[f + 9], 4, -640364487),
                e = l(e, a, d, c, b[f + 12], 11, -421815835),
                c = l(c, e, a, d, b[f + 15], 16, 530742520),
                d = l(d, c, e, a, b[f + 2], 23, -995338651),
                a = m(a, d, c, e, b[f + 0], 6, -198630844),
                e = m(e, a, d, c, b[f + 7], 10, 1126891415),
                c = m(c, e, a, d, b[f + 14], 15, -1416354905),
                d = m(d, c, e, a, b[f + 5], 21, -57434055),
                a = m(a, d, c, e, b[f + 12], 6, 1700485571),
                e = m(e, a, d, c, b[f + 3], 10, -1894986606),
                c = m(c, e, a, d, b[f + 10], 15, -1051523),
                d = m(d, c, e, a, b[f + 1], 21, -2054922799),
                a = m(a, d, c, e, b[f + 8], 6, 1873313359),
                e = m(e, a, d, c, b[f + 15], 10, -30611744),
                c = m(c, e, a, d, b[f + 6], 15, -1560198380),
                d = m(d, c, e, a, b[f + 13], 21, 1309151649),
                a = m(a, d, c, e, b[f + 4], 6, -145523070),
                e = m(e, a, d, c, b[f + 11], 10, -1120210379),
                c = m(c, e, a, d, b[f + 2], 15, 718787259),
                d = m(d, c, e, a, b[f + 9], 21, -343485551),
                a = (a + j) >>> 0,
                d = (d + n) >>> 0,
                c = (c + p) >>> 0,
                e = (e + q) >>> 0;
        return o.endian([a, d, c, e]);
    };
    i._ff = function (a, b, g, d, c, e, f) {
        a = a + ((b & g) | (~b & d)) + (c >>> 0) + f;
        return ((a << e) | (a >>> (32 - e))) + b;
    };
    i._gg = function (a, b, g, d, c, e, f) {
        a = a + ((b & d) | (g & ~d)) + (c >>> 0) + f;
        return ((a << e) | (a >>> (32 - e))) + b;
    };
    i._hh = function (a, b, g, d, c, e, f) {
        a = a + (b ^ g ^ d) + (c >>> 0) + f;
        return ((a << e) | (a >>> (32 - e))) + b;
    };
    i._ii = function (a, b, g, d, c, e, f) {
        a = a + (g ^ (b | ~d)) + (c >>> 0) + f;
        return ((a << e) | (a >>> (32 - e))) + b;
    };
    i._blocksize = 16;
    i._digestsize = 16;
})();
(function () {
    var j = Crypto,
        o = j.util,
        n = j.charenc,
        h = n.UTF8,
        g = n.Binary;
    j.HMAC = function (i, a, b, j) {
        a.constructor == String && (a = h.stringToBytes(a));
        b.constructor == String && (b = h.stringToBytes(b));
        b.length > i._blocksize * 4 && (b = i(b, { asBytes: !0 }));
        for (var d = b.slice(0), b = b.slice(0), c = 0; c < i._blocksize * 4; c++) (d[c] ^= 92), (b[c] ^= 54);
        i = i(d.concat(i(b.concat(a), { asBytes: !0 })), { asBytes: !0 });
        return j && j.asBytes ? i : j && j.asString ? g.bytesToString(i) : o.bytesToHex(i);
    };
})();

const hash = Crypto.MD5(
    'maximkarlov_github_io;www.market.ua;DH783019;1415379863;1547.36;UAH;Процессор Intel Core i5-4670 3.4GHz;1;1000;Вася;Пупкин',
    '50ba690ce7ad91fef16e65174227696ddb470945'
);
console.log('hash', hash);
// export default  Crypto;
