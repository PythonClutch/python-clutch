"""empty message

Revision ID: 19ad282b9ec
Revises: 5794dc1a519
Create Date: 2015-03-25 20:13:21.296042

"""

# revision identifiers, used by Alembic.
revision = '19ad282b9ec'
down_revision = '5794dc1a519'

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('project', sa.Column('release_count', sa.Integer(), nullable=True))
    op.add_column('project_log', sa.Column('release_count', sa.Integer(), nullable=True))
    op.add_column('user', sa.Column('linkedin_url', sa.String(length=255), nullable=True))
    op.add_column('user', sa.Column('portfolio_url', sa.String(length=255), nullable=True))
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'portfolio_url')
    op.drop_column('user', 'linkedin_url')
    op.drop_column('project_log', 'release_count')
    op.drop_column('project', 'release_count')
    ### end Alembic commands ###
