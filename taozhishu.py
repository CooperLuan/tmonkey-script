#!/usr/bin/python2.7
# -*- coding: utf-8 -*-
import logging
logging.basicConfig(level=logging.INFO)
import json
import tornado.ioloop
import tornado.web
from datetime import datetime, timedelta

# 需要抓包的关键词，将其值设为 0
keywords = {
    '羽绒服': 0,
    '山地车': 0,
    '冲锋衣': 0
}

keywords_ststc = dict((k, {'query': [], 'trade': []}) for k in keywords)


def parse_data(data):
    '''处理返回的数据

    data 格式
    [关键词 冲锋衣的搜索指数](http://shu.taobao.com/trendindex.json?query=%E5%86%B2%E9%94%8B%E8%A1%A3&type=query)
    [关键词 冲锋衣的成交指数](http://shu.taobao.com/trendindex.json?query=%E5%86%B2%E9%94%8B%E8%A1%A3&type=trade)
    '''
    keyword = data['queries'][0].encode('utf-8')
    types = ','.join(data['types'])
    # days = data['days']
    end_date = datetime.strptime(data['endDate'], '%Y-%m-%d')
    # start_date = data['startDate']
    # 从 end_date 开始倒数计数
    trend = list(reversed(
        [[(end_date - timedelta(i)).strftime('%Y-%m-%d'), t]
         for i, t in enumerate(reversed(data['details'][0]['trend']))])
    )
    keywords_ststc[keyword][types] = trend
    # 如果关键词的数据都有了，则写入文件
    if min([keywords_ststc[k]['query'] and keywords_ststc[k]['trade'] for k in keywords_ststc]) != []:
        f_name = '20131120.txt'
        # open('20131120.txt', 'w').write(json.dumps(keywords_ststc, ensure_ascii=False))
        open(f_name, 'w').write('')
        for kw in keywords:
            logging.info('%s %s %s', kw, len(keywords_ststc[kw]['query']), len(keywords_ststc[kw]['trade']))
            for i in range(len(trend)):
                open(f_name, 'a').write('%s %s %s %s\n' % (
                    kw,
                    trend[i][0],
                    keywords_ststc[kw]['query'][i][0],
                    keywords_ststc[kw]['trade'][i][0]
                ))


class MainHandler(tornado.web.RequestHandler):

    def get(self):
        selected_k = [k for k, v in keywords.items() if v == 0]
        self.set_header("Access-Control-Allow-Origin", "http://shu.taobao.com")
        self.write({'keyword': selected_k and selected_k[0] or None})

    def post(self):
        global keywords
        # 将返回数据转换为 dict
        data = json.loads(self.get_argument('data'))
        if ','.join(data['types']) != 'query':
            keywords[data['queries'][0].encode('utf-8')] = 1
        self.set_header("Access-Control-Allow-Origin", "http://shu.taobao.com")
        # 打印返回数据
        logging.info('%s %s', data['queries'][0], ','.join(data['types']))
        # 处理返回的数据
        # TODO
        parse_data(data)
        self.write('ok')

application = tornado.web.Application([
    (r"/", MainHandler),
], debug=True)

if __name__ == "__main__":
    application.listen(8866)
    tornado.ioloop.IOLoop.instance().start()
